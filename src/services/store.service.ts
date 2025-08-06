import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateStoreDto } from 'src/dtos/store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStoreDto) {
    return this.prisma.store.create({ data: dto });
  }

  async findAll() {
    return this.prisma.store.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
      include: {
        sales: {
          include: {
            product: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!store) {
      throw new NotFoundException(`Store with id '${id}' not found.`);
    }

    return store;
  }
}
