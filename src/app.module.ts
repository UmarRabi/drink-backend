import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './services/product.service';
import { BrandController } from './controllers/brand.controller';
import { ProductController } from './controllers/product.controller';
import { BrandService } from './services/brand.service';
import { PrismaService } from './services/prisma.service';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';

@Module({
  imports: [],
  controllers: [AppController, BrandController, ProductController, StoreController],
  providers: [AppService, ProductService, BrandService, PrismaService, StoreService],
})
export class AppModule {}
