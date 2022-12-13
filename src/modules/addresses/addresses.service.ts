import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressUpdateDTO } from './address.DTO';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async listAddresses() {
    const addresses = this.prisma.address.findMany();

    return addresses;
  }

  async listAddress(address_id: string) {
    const address = await this.prisma.address.findUnique({
      where: {
        id: address_id,
      },
    });

    if (!address) {
      throw new HttpException('Address not exists!', HttpStatus.NOT_FOUND);
    }

    return address;
  }

  async updateAddress(data: AddressUpdateDTO, address_id: string) {
    const address = await this.prisma.address.findUnique({
      where: {
        id: address_id,
      },
    });

    if (!address) {
      throw new HttpException('Address not exists!', HttpStatus.NOT_FOUND);
    }

    const updatedAddress = await this.prisma.address.update({
      data,
      where: {
        id: address_id,
      },
    });

    return updatedAddress;
  }
}
