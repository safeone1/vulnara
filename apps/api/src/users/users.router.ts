import { Inject } from '@nestjs/common';
import { Query, Router } from 'nestjs-trpc';
import { z } from 'zod';
import { DatabaseService } from 'src/database/database.service';

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

@Router({ alias: 'users' })
export class UserRouter {
  constructor(
    @Inject(DatabaseService) private readonly prisma: DatabaseService,
  ) {}

  @Query({ output: z.array(userSchema) })
  async getAllUsers() {
    const users = await this.prisma.client.user.findMany();
    return users;
  }
}
