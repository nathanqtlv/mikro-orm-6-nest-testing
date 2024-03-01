# vgp-template-repo

## What is included

- Basic nestjs app setup with a healthcheck route (without database)
- package.json with prebuild scripts
- circleci configuration with a workflow which include:
  - linter job
  - test job
  - build Docker image job
- Dockerfile
- husky with precommit rules
- Linter configuration based on `voodoo.io/prettier-config`, `@voodoo.io/eslint-config` and `voodoo.io/commitlint-config`
- jest
- renovate config file
- Git repository configuration script
- README.md prefilled with some documentation which should be shared between projects.

## What will/may come later

- Hello World! implementation with associated tests.
- Basic database implementation with associated Docker, migration jobs and so on.
- jest test with in-memory database setup
- Doc generator - TBC
- Changelog generator - TBC
- Deployment process
- docker-compose

## How to use this template

This is a github template repository to help bootstrap a new repository for vgp (see <https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template>).

### CODEOWNERS

The CODEOWNERS file is present in the `.github/` directory, by default it is set with ownership on all files for vgp-engineering team, you should edit it accordingly.

Note: codeowner team should have write access on the repository, eitherway github will return an error saying it can't found the team.

### GithubConfig

There is a script to automate github configuration, it require having the gh cli installed locally (<https://cli.github.com>).

Run `./config-repo.sh` from the root directory to configure your GIT repository properly (you may need to login on gh first).

### Renovate

The template is shipped with a renovate config file (`renovate.json`), to use it the repository must be manually added to the renovate repo list.

## API documentation

The API architecture should follow as much as possible, to insure consistency between projects, the one that was defined for asset-service (https://www.notion.so/voodoo/Asset-Service-ee82af3c985c409890174d7069fa22f5).

At the moment the template is only shipped with a basic healthcheck.

### launch locally

_you will need to have the $NPM_TOKEN env var setted with either read-only token or read and publish token for this step, you can get them from 1password_

`npm install`

`npm run start` or `npm run start:dev` to run in watch mode

You can then request http://localhost:3000/health and should get the response

`{"status":"ok","info":{},"error":{},"details":{}}`

### run tests

`npm run test` or `npm test`

To run tests in watch mode : `npm run test:watch` this will only run tests associated with files which have been modified since the last commit.

## Development processes

We are following the Github flow (<https://githubflow.github.io>):

- **Anything in the master branch is deployable and ready for production**
- To work on a feature/hotfix a new branch must be created from master
- Once your work is done push your branch and create a pull request from it.
- Once your pull requested is validated merge the pullrequest from GitHub. Branch should be squashed to a single commit, and rebased onto latest master prior to merge.
- Ideally it should not be allowed to push directly to master. (this should be the case if you used the github configuration script).

## Deploy to production

**This part is yet to be defined, update the README once we know our deployment process and how to include a new repository to it.**

## Resources

- [VGP main notion page](https://www.notion.so/voodoo/Infra-setup-068e626d0daa4400816ab9db4259cfa5)
- [VGP infra setup notion page](https://www.notion.so/voodoo/Infra-setup-068e626d0daa4400816ab9db4259cfa5)
- [GitHub flow](https://githubflow.github.io)
- [VGP service architecture](https://www.notion.so/voodoo/Asset-Service-ee82af3c985c409890174d7069fa22f5)
