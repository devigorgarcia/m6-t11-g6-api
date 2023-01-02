import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserCreateDTO } from 'src/modules/users/users.DTO';
import { createVehicleDTO } from 'src/modules/vehicles/vehicles.DTO';

export class CreateCommentDto {
  @IsOptional()
  @ApiProperty()
  id?: string;
  @IsNotEmpty()
  @ApiProperty()
  content: string;
  @IsOptional()
  @ApiProperty()
  createdAt?: string;
  @IsOptional()
  @ApiProperty()
  user: UserCreateDTO;
  @IsOptional()
  @ApiProperty()
  vehicle: createVehicleDTO;
}
