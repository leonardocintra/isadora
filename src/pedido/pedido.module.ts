import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoRepository } from './pedido.repository';

@Module({
  providers: [PedidoService, PedidoRepository],
  exports: [PedidoService]
})
export class PedidoModule { }
