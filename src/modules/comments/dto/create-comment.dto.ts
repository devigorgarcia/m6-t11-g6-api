import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserCreateDTO } from 'src/modules/users/users.DTO';
import { createVehicleDTO } from 'src/modules/vehicles/vehicles.DTO';

export class CreateCommentDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty()
  content: string;
  @IsOptional()
  createdAt?: string;
  @IsOptional()
  user: UserCreateDTO;
  @IsOptional()
  vehicle: createVehicleDTO;
}
