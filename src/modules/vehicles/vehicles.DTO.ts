import { ApiProperty } from '@nestjs/swagger/dist';
import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class createVehicleDTO {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  @ApiProperty()
  year: number;
  @IsNotEmpty()
  @ApiProperty()
  km: number;
  @IsNotEmpty()
  @ApiProperty()
  price: number;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  isCar: boolean;
  @IsNotEmpty()
  @ApiProperty()
  frontImg: string;
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  isActive?: boolean;
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  gallery?: string[];
}

export class updateVehicleDTO {
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  title?: string;
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  year?: number;
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  km?: number;
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  price?: number;
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  description?: string;
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  isCar?: boolean;
  @IsOptional()
  @ApiProperty()
  @ApiPropertyOptional()
  frontImg?: string;
}
