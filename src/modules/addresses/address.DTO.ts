import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddressCreateDTO {
  @IsNotEmpty()
  cep: string;
  @IsNotEmpty()
  state: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  number: number;
  @IsNotEmpty()
  complement: string;
}

export class AddressUpdateDTO {
  @IsOptional()
  cep?: string;
  @IsOptional()
  state?: string;
  @IsOptional()
  city?: string;
  @IsOptional()
  street?: string;
  @IsOptional()
  number?: number;
  @IsOptional()
  complement?: string;
}
