import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { AddressCreateDTO } from '../addresses/address.DTO';

export class UserCreateDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  password: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  cpf: string;
  @IsNotEmpty()
  fone: string;
  @IsNotEmpty()
  birthday: string;
  @IsNotEmpty()
  descripiton: string;
  @IsNotEmpty()
  is_admin: boolean;
  @IsNotEmpty()
  address: AddressCreateDTO;
}

export class UserUpdateDTO {
  @IsOptional()
  name?: string;
  @IsOptional()
  password?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  cpf?: string;
  @IsOptional()
  fone?: string;
  @IsOptional()
  birthday?: string;
  @IsOptional()
  descripiton?: string;
}
