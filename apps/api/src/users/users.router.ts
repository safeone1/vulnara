import { Inject } from '@nestjs/common';
import { Query, Router } from 'nestjs-trpc';
import { DatabaseService } from 'src/database/database.service';

@Router({ alias: 'users' })
export class UserRouter {
  constructor(
    @Inject(DatabaseService) private readonly prisma: DatabaseService,
  ) {}

  @Query()
  async getAllUsers() {
    const users = await this.prisma.client.user.findMany();
    return users;
  }
}
