import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateBrandDto } from 'src/dtos/brand.dto';

@Injectable()
export class BrandService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createBrandDto: CreateBrandDto) {
        const { name, description, website, logoUrl } = createBrandDto;

        // Check for duplicate brand
        const existing = await this.prisma.brand.findUnique({ where: { name } });
        if (existing) {
            throw new ConflictException(`Brand with name '${name}' already exists.`);
        }

        // Create brand
        const brand = await this.prisma.brand.create({
            data: {
                name,
                description,
                website,
                logoUrl,
            },
        });

        return brand;
    }

    async findAll() {
        return this.prisma.brand.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const brand = await this.prisma.brand.findUnique({ where: { id } });

        if (!brand) {
            throw new NotFoundException(`Brand with id '${id}' not found.`);
        }

        return brand;
    }
}
