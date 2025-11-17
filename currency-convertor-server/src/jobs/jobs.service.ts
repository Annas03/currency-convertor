import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private readonly configService: ConfigService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkScheduledPosts() {
    try {
      this.logger.log('Hitting the server to keep the instance running...');

      await fetch(`${process.env.BACK_END_URL}/`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
