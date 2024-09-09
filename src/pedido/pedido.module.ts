import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoRepository } from './pedido.repository';
import { PedidoSocket } from './pedido.socket';

@Module({
  providers: [PedidoService, PedidoRepository, PedidoSocket],
  exports: [PedidoService]
})
export class PedidoModule { }
