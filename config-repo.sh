#!/bin/bash

# Check for required binaries
required_binaries=(
    gh
)

for binary in "${required_binaries[@]}"; do
    command -v "$binary" >/dev/null 2>&1 || echo "$binary is required but could not be found in \$PATH"
done

# Check if gh cli authentication is configured
gh auth status  >/dev/null 2>&1 || echo "gh authentication is not configured. run 'gh auth login' first."

# Set local variables
repo_name=$(basename "$(git rev-parse --show-toplevel)")
owner="VoodooTeam"
default_branch="master"
repository_id="$(gh api graphql -f query='{repository(owner:"'"$owner"'",name:"'"$repo_name"'"){id}}' -q .data.repository.id)"
branch_protection_rule_id=$(
  gh api graphql -f query='
  {
    repository(owner:"'"$owner"'",name:"'"$repo_name"'") {
      branchProtectionRules(first: 100) {
        edges {
          node {
            pattern
            id
          }
        }
      }
    }
  }
  ' -q '.data.repository.branchProtectionRules.edges[].node  | select(.pattern=="'$default_branch'").id'
)

# Repository setup
gh repo edit "$owner"/"$repo_name" \
    --enable-squash-merge=false \
    --enable-merge-commit=false \
    --enable-rebase-merge=true \
    --delete-branch-on-merge=true \
    --enable-projects=false \
    --enable-issues=true \
    --enable-wiki=false


# Branch Protection Rules setup
# The following approach will only act on settings which are explicitly listed here.
# Any other settings, if they exist, will be untouched.

if [[ -z "$branch_protection_rule_id" ]] ; then
  gh api graphql -f query='
  mutation {
    createBranchProtectionRule(input: {
      allowsDeletions: false
      allowsForcePushes: false
      isAdminEnforced : true
      pattern: "'"$default_branch"'"
      repositoryId: "'"$repository_id"'"
      requiredApprovingReviewCount: 1
      requiredStatusCheckContexts: [
        "ci/circleci: linting",
        "ci/circleci: test",
      ]
      requiresApprovingReviews: true
      requiresCodeOwnerReviews: true
      requiresLinearHistory: true
      requiresStatusChecks: true
      requiresStrictStatusChecks: true
    }) { clientMutationId }
  }' --silent && echo "Created branch protection rule."

else

  gh api graphql -f query='
  mutation {
    updateBranchProtectionRule(input: {
      branchProtectionRuleId: "'"$branch_protection_rule_id"'"
      allowsDeletions: false
      allowsForcePushes: false
      isAdminEnforced : true
      pattern: "'"$default_branch"'"
      requiredApprovingReviewCount: 1
      requiredStatusCheckContexts: [
        "ci/circleci: linting",
        "ci/circleci: test",
      ]
      requiresApprovingReviews: true
      requiresCodeOwnerReviews: true
      requiresLinearHistory: true
      requiresStatusChecks: true
      requiresStrictStatusChecks: true
    }) { clientMutationId }
  }' --silent && echo "Updated branch protection rule."

fi

# Ensure that visibility is internal.
# TODO: make idempotent
gh repo edit "VoodooTeam/$repo_name" --visibility internal

# TODO:
# - Add `@infra-team` as owners => see UpdateTeamsRepository
  # This should work, but there seems to be an unexplained permission issue...
  # infra_team_id="$(gh api graphql -f query='{organization(login: "'$owner'"){team(slug: "infra"){id}}}' -q .data.organization.team.id)"
  # gh api graphql -f query='
  # mutation { updateTeamsRepository(input:{
  #   repositoryId: "'$repository_id'"
  #   teamIds: ["'$infra_team_id'"]
  #   permission: ADMIN
  # }) { clientMutationId }
  # }'

# - Activate repo on CircleCI: Probably not automatable.
# - Activate repo on Atlantis-Sandbox (requires GH admin privileges)
# - Activate repo on Renovate (requires GH admin privileges)
