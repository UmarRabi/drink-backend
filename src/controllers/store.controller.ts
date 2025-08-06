import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreateStoreDto } from 'src/dtos/store.dto';
import { StoreService } from 'src/services/store.service';

@ApiTags('Stores')
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new store' })
  @ApiResponse({ status: 201, description: 'Store created successfully' })
  async create(@Body() dto: CreateStoreDto) {
    return this.storeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all stores (id and name)' })
  @ApiResponse({ status: 200 })
  async findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store details and sales' })
  @ApiParam({ name: 'id', description: 'Store UUID' })
  @ApiResponse({ status: 200 })
  async findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }
}
