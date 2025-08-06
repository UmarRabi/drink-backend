import { IsString, IsNotEmpty, IsInt, IsDateString, IsUUID, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'b5f90162-f6e1-4701-9983-6c61bcb5287a', description: 'Brand ID this product belongs to' })
  @IsUUID()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty({ example: 'Star Lager 500ml', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Classic lager beer with a crisp refreshing taste.', description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 500, description: 'Volume in milliliters' })
  @IsInt()
  volume_ml: number;

  @ApiProperty({ example: '2025-07-15', description: 'Production date (ISO format)' })
  @IsDateString()
  production_date: string;

  @ApiProperty({ example: '2026-07-15', description: 'Expiration date (ISO format)' })
  @IsDateString()
  expiration_date: string;
}

export class CreateProductHistoryDto {
  @ApiProperty({ example: 'Packaging Redesign', description: 'Title of the update' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'In July 2025, we switched to a more eco-friendly bottle design.',
    description: 'Detailed description of the product update or history',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ example: 'admin@brand.com', description: 'Who added this history' })
  @IsString()
  @IsOptional()
  updatedBy?: string;
}

export class CreateProductSaleDto {
//   @ApiProperty({ example: 'product-uuid' })
//   @IsString()
//   @IsNotEmpty()
//   productId: string;

  @ApiProperty({ example: 'store-uuid' })
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @ApiPropertyOptional({ example: 'prev-store-uuid' })
  @IsString()
  @IsOptional()
  predecessorStoreId?: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 1200.50 })
  @IsNumber()
  costPrice: number;
}


