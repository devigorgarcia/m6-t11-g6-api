import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { UserCreateDTO } from 'src/modules/users/users.DTO';
import { createVehicleDTO } from 'src/modules/vehicles/vehicles.DTO';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsOptional()
  id?: string;
  @IsOptional()
  content?: string;
  @IsOptional()
  createdAt?: string;
  @IsOptional()
  user?: UserCreateDTO;
  @IsOptional()
  vehicle?: createVehicleDTO;
}
