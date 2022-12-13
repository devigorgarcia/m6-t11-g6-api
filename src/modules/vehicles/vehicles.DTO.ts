import { IsNotEmpty, IsOptional } from 'class-validator';

export class createVehicleDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  year: number;
  @IsNotEmpty()
  km: number;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  isCar: boolean;
  @IsNotEmpty()
  frontImg: string;
  @IsOptional()
  galleryImg?: string[];
}

export class updateVehicleDTO {
  @IsOptional()
  title?: string;
  @IsOptional()
  year?: number;
  @IsOptional()
  km?: number;
  @IsOptional()
  price?: number;
  @IsOptional()
  description?: string;
  @IsOptional()
  isCar?: boolean;
  @IsOptional()
  frontImg?: string;
  @IsOptional()
  galleryImg?: string[];
}
