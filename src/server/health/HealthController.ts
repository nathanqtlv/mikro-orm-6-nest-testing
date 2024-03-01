import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HealthCheckResult } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}
  @Get()
  @HealthCheck()
  public check(): Promise<HealthCheckResult> {
    // a proper list of health checks should be added here, see https://docs.nestjs.com/recipes/terminus#setting-up-a-healthcheck for the documentation
    return this.health.check([]);
  }
}
