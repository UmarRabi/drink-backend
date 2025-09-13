import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateProductDto, CreateProductHistoryDto, CreateProductSaleDto } from 'src/dtos/product.dto';
import { UtilsService } from './utils.service';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService, private readonly utilService: UtilsService) { }

    async create(dto: CreateProductDto) {
        // Optional: check if brand exists
        const brand = await this.prisma.brand.findUnique({
            where: { id: dto.brandId },
        });

        if (!brand) {
            throw new NotFoundException(`Brand with id '${dto.brandId}' not found.`);
        }

        const result = await this.prisma.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                volume_ml: dto.volume_ml,
                production_date: new Date(dto.production_date),
                expiration_date: new Date(dto.expiration_date),
                brand: {
                    connect: { id: dto.brandId },
                },
            },
        });
        const url = `${process.env.FRONTEND_URL}/products/${result.id}`
        await this.utilService.generateQRCode(url, result.id)

        return await this.prisma.product.update(
            {
                where: { id: result.id },
                data: { qrcode_url: `${url}.png` }
            }
        )


    }

    async findAll(brandId?: string) {
        return this.prisma.product.findMany({
            where: brandId ? { brandId } : undefined,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                description: true,
                production_date: true,
                expiration_date: true,
                qrcode_url:true,
                brand: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                brand: {
                    select: {
                        id: true,
                        name: true,
                        logoUrl: true,
                    },
                },
                histories: true,
                sales: {
                    include: {
                        store: true,
                    },
                },
            },
        });

        if (!product) {
            throw new NotFoundException(`Product with id '${id}' not found.`);
        }

        return product;
    }

    async addHistory(productId: string, dto: CreateProductHistoryDto) {
        // Check if the product exists
        const product = await this.prisma.product.findUnique({ where: { id: productId } });

        if (!product) {
            throw new NotFoundException(`Product with ID '${productId}' not found.`);
        }

        // Create the history entry
        return this.prisma.productHistory.create({
            data: {
                productId,
                title: dto.title,
                description: dto.description,
                updatedBy: dto.updatedBy,
            },
        });
    }


    async recordSale(dto: CreateProductSaleDto, productId: string) {
        const { storeId, quantity, costPrice, predecessorStoreId } = dto;

        // Check product
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new NotFoundException(`Product with ID '${productId}' not found`);

        // Check receiving store
        const store = await this.prisma.store.findUnique({ where: { id: storeId } });
        if (!store) throw new NotFoundException(`Store with ID '${storeId}' not found`);

        // Optional: check predecessor store
        if (predecessorStoreId) {
            const predecessor = await this.prisma.store.findUnique({ where: { id: predecessorStoreId } });
            if (!predecessor) throw new NotFoundException(`Predecessor Store not found`);
        }

        return this.prisma.productSale.create({
            data: {
                productId,
                storeId,
                quantity,
                costPrice,
                // description
                predecessorStoreId,
            },
        });
    }

    async findSale(saleId: string) {
        console.log(saleId)
        return await this.prisma.product.findFirst({
            where: { id: saleId},
            include: { sales: {include:{predecessorStore:true, store:true}},histories: true, brand: true }
        })
    }

}
