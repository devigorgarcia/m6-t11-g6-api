import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createVehicleDTO, updateVehicleDTO } from './vehicles.DTO';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(data: createVehicleDTO, userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return vehicle;
  }

  async listVehicles() {
    const vehicles = await this.prisma.vehicle.findMany();

    return vehicles;
  }

  async listVehicle(vehicleId: string) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
      },
      include: {
        Comment: true,
        user: true,
      },
    });

    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    return vehicle;
  }

  async updateVehicle(data: updateVehicleDTO, vehicleId: string) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    const updatedVehicle = await this.prisma.vehicle.update({
      data,
      where: {
        id: vehicleId,
      },
    });

    return updatedVehicle;
  }

  async deleteVehicle(vehicleId: string) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.vehicle.delete({
      where: {
        id: vehicleId,
      },
    });
  }
}
