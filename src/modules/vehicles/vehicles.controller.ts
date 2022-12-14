import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Request } from 'express';
import { createVehicleDTO, updateVehicleDTO } from './vehicles.DTO';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() data: createVehicleDTO, @Req() request: Request) {
    const { id } = request.user;
    return this.vehiclesService.create(data, id);
  }

  @Get()
  async listVehicles() {
    return this.vehiclesService.listVehicles();
  }

  @Get(':vehicleId')
  async listVehicle(@Param('vehicleId') vehicleId: string) {
    return this.vehiclesService.listVehicle(vehicleId);
  }

  @Patch(':vehicleId')
  async updateVehicle(
    @Param('vehicleId') vehicleId: string,
    @Body() data: updateVehicleDTO,
  ) {
    return this.vehiclesService.updateVehicle(data, vehicleId);
  }

  @Delete(':vehicleId')
  @HttpCode(204)
  async deleteVehicle(@Param('vehicleId') vehicleId: string) {
    return this.vehiclesService.deleteVehicle(vehicleId);
  }
}
