/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDTO } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  create() {
    return `Crea un producto`;
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDTO) {
    return this.productClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.productClient.send({ cmd: 'find_one_product' }, { id }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return ` Esta funcion actualiza el producto No.${id} con el body => ${body}`;
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return ` Esta funcion elimina el producto No.${id}`;
  }
}
