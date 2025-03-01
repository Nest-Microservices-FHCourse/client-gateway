import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { OrderStatus, OrderStatusList } from 'src/orders/enum/order.enum';

export class PaginationDTO {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit: number;
}

export class PaginationOrderDTO extends PaginationDTO {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
