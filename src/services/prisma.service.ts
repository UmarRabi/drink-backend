import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // constructor() {
  // super({
  //   log: ['query', 'info', 'warn', 'error'], // Logs various levels, including SQL queries
  // });
  // }
  async onModuleInit() {
    await this.$connect();
    // console.log(Prisma.ModelName);
    // this.$on(Prisma., (e) => {
    //   console.log(e);
    // });
    // this.$on('query', (e) => {
    //   console.log('Query:', e.query); // Logs the SQL query
    //   console.log('Params:', e.params); // Logs the actual parameters
    //   console.log('Duration:', e.duration); // Optional: Logs query duration
    // });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async models() {
    return Object.keys(Prisma.ModelName);
  }
}
