import { Controller, Get, Body, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressUpdateDTO } from './address.DTO';
import { AddressesService } from './addresses.service';

@Controller('addresses')
@ApiTags('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  async listAddresses() {
    return this.addressesService.listAddresses();
  }

  @Get(':addressId')
  async listAddress(@Param('addressId') addressId: string) {
    return this.addressesService.listAddress(addressId);
  }

  @Patch(':addressId')
  async updateAddress(
    @Param('addressId') addressId: string,
    @Body() data: AddressUpdateDTO,
  ) {
    return this.addressesService.updateAddress(data, addressId);
  }
}
