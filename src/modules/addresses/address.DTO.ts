import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddressCreateDTO {
  @IsNotEmpty()
  @ApiProperty()
  cep: string;
  @IsNotEmpty()
  @ApiProperty()
  state: string;
  @IsNotEmpty()
  @ApiProperty()
  city: string;
  @IsNotEmpty()
  @ApiProperty()
  street: string;
  @IsNotEmpty()
  @ApiProperty()
  number: number;
  @IsNotEmpty()
  @ApiProperty()
  complement: string;
}

export class AddressUpdateDTO {
  @IsOptional()
  @ApiProperty()
  cep?: string;
  @IsOptional()
  @ApiProperty()
  state?: string;
  @IsOptional()
  @ApiProperty()
  city?: string;
  @IsOptional()
  @ApiProperty()
  street?: string;
  @IsOptional()
  @ApiProperty()
  number?: number;
  @IsOptional()
  @ApiProperty()
  complement?: string;
}
