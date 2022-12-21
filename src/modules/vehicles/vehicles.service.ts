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
    const newGallery = [];
    if (data.gallery) {
      data.gallery.forEach((imageURL) => {
        const newUrl = {
          url: imageURL,
        };
        newGallery.push(newUrl);
      });
    }

    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
        gallery: {
          createMany: {
            data: [...newGallery],
          },
        },
      },
      include: {
        gallery: true,
      },
    });

    return vehicle;
  }

  async listVehicles() {
    const vehicles = await this.prisma.vehicle.findMany({
      include: {
        user: true,
      },
    });

    return vehicles;
  }

  async listVehicle(vehicleId: string) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
      },
      select: {
        id: true,
        title: true,
        price: true,
        year: true,
        km: true,
        isCar: true,
        description: true,
        frontImg: true,
        isActive: true,
        user: {
          select: {
            name: true,
            descripiton: true,
          },
        },
        Comment: true,
        gallery: true,
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

    const newGallery = [];
    if (data.gallery) {
      data.gallery.forEach((imageURL) => {
        const newUrl = {
          url: imageURL,
        };
        newGallery.push(newUrl);
      });
    }

    const updatedVehicle = await this.prisma.vehicle.update({
      where: {
        id: vehicleId,
      },
      data: {
        ...data,
        gallery: {
          deleteMany: {},
          create: newGallery.map((item) => {
            return item;
          }),
        },
      },
      include: {
        gallery: true,
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
