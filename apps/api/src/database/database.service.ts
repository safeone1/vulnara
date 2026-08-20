import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { prisma } from '@vulnara/db-schema';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleInit {
  public readonly client = prisma;
  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit() {
    await this.client.$connect();
    this.logger.log('Database connection established.');
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
