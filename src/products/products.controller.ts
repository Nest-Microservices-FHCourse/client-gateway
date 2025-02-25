import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  create() {
    return `Crea un producto`;
  }

  @Get()
  findAll() {
    return ` Esta funcion regresa todos los productos`;
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
