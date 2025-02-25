import {
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return ` Esta funcion regresa el producto No.${id}`;
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
