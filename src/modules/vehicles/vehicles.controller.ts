import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { Request } from 'express';
import { createVehicleDTO, updateVehicleDTO } from './vehicles.DTO';
import { VehiclesService } from './vehicles.service';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Cria um veículo' })
  async create(@Body() data: createVehicleDTO, @Req() request: Request) {
    const { id } = request.user;
    return this.vehiclesService.create(data, id);
  }

  @Get()
  @ApiCreatedResponse({ description: 'Lista todos os veículos' })
  async listVehicles() {
    return this.vehiclesService.listVehicles();
  }

  @Get(':vehicleId')
  @ApiCreatedResponse({ description: 'Lista um veículo pelo ID' })
  async listVehicle(@Param('vehicleId') vehicleId: string) {
    return this.vehiclesService.listVehicle(vehicleId);
  }

  @Patch(':vehicleId')
  @ApiCreatedResponse({ description: 'Atualiza as informações do veículo' })
  async updateVehicle(
    @Param('vehicleId') vehicleId: string,
    @Body() data: updateVehicleDTO,
  ) {
    return this.vehiclesService.updateVehicle(data, vehicleId);
  }

  @Patch('/inactivate/:vehicleId')
  @ApiCreatedResponse({ description: 'Soft Delete um veículo' })
  @HttpCode(200)
  async deleteVehicle(@Param('vehicleId') vehicleId: string) {
    return this.vehiclesService.deleteVehicle(vehicleId);
  }
}
