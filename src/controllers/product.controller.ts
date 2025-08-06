import { Controller, Get, Post, Param, Body, Query, NotFoundException } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { CreateProductDto, CreateProductHistoryDto, CreateProductSaleDto } from 'src/dtos/product.dto';
import { ProductService } from 'src/services/product.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully.' })
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'List all products' })
    @ApiQuery({
        name: 'brandId',
        required: false,
        description: 'Optional filter by brand ID',
    })
    @ApiResponse({ status: 200, description: 'List of products' })
    async findAll(@Query('brandId') brandId?: string) {
        return this.productService.findAll(brandId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single product by ID' })
    @ApiParam({ name: 'id', description: 'Product UUID' })
    @ApiResponse({ status: 200, description: 'Product details' })
    async findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Post(':id/history')
    @ApiOperation({ summary: 'Add a product history entry' })
    @ApiParam({ name: 'id', description: 'Product UUID' })
    @ApiResponse({ status: 201, description: 'Product history entry created' })
    async addHistory(
        @Param('id') id: string,
        @Body() dto: CreateProductHistoryDto,
    ) {
        return this.productService.addHistory(id, dto);
    }

    @Post(':id/sales')
    @ApiOperation({ summary: 'Record a new product sale' })
    @ApiParam({ name: 'productId', type: String, description: 'ID of the product being sold' })
    @ApiResponse({ status: 201, description: 'Product sale recorded successfully' })
    @ApiResponse({ status: 404, description: 'Product or store not found' })
    async recordSale(
        @Param('id') productId: string,
        @Body() dto: CreateProductSaleDto,
    ) {
        return this.productService.recordSale(dto, productId);
    }

    @Get('/sale/:saleId')
    @ApiOperation({ summary: 'Get details of a specific product sale' })
    @ApiParam({ name: 'saleId', type: String, description: 'ID of the sale record' })
    @ApiResponse({ status: 200, description: 'Sale found and returned' })
    @ApiResponse({ status: 404, description: 'Sale not found' })
    async findSale(@Param('saleId') saleId: string) {
        const sale = await this.productService.findSale(saleId);
        if (!sale) throw new NotFoundException(`Sale with ID '${saleId}' not found`);
        return sale;
    }

}
