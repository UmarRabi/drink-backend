import { IsString, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ example: 'Star Lager', description: 'The name of the brand' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Founded in 1949, one of Nigeria\'s oldest beer brands.',
    description: 'Origin story or background of the brand',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ example: 'https://starbeer.com', description: 'Official brand website' })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ example: 'https://cdn.myapp.com/logos/star.png', description: 'Logo image URL' })
  @IsUrl()
  @IsOptional()
  logoUrl?: string;
}
