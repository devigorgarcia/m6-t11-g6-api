import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { AddressCreateDTO } from '../addresses/address.DTO';

export class UserCreateDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  password: string;
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  cpf: string;
  @IsNotEmpty()
  @ApiProperty()
  fone: string;
  @IsNotEmpty()
  @ApiProperty()
  birthday: string;
  @IsNotEmpty()
  @ApiProperty()
  descripiton: string;
  @IsNotEmpty()
  @ApiProperty()
  is_admin: boolean;
  @IsNotEmpty()
  @ApiProperty()
  address: AddressCreateDTO;
}

export class UserUpdateDTO {
  @IsOptional()
  @ApiProperty()
  name?: string;
  @IsOptional()
  @ApiProperty()
  password?: string;
  @IsOptional()
  @ApiProperty()
  email?: string;
  @IsOptional()
  @ApiProperty()
  cpf?: string;
  @IsOptional()
  @ApiProperty()
  fone?: string;
  @IsOptional()
  @ApiProperty()
  birthday?: string;
  @IsOptional()
  @ApiProperty()
  descripiton?: string;
}
