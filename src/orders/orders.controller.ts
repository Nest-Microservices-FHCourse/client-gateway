import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateOrderDto, StatusDTO, UpdateStatusDTO } from './dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDTO, PaginationOrderDTO } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationOrderDTO) {
    return this.orderClient.send('findAllOrders', paginationDTO);
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderClient.send('findOneOrder', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDTO: StatusDTO,
    @Query() paginationDTO: PaginationDTO,
  ) {
    return this.orderClient
      .send('findAllOrders', { ...paginationDTO, status: statusDTO.status })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDTO: UpdateStatusDTO,
  ) {
    // return { ...statusDTO, id };
    return this.orderClient
      .send('changeOrderStatus', { ...statusDTO, id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
