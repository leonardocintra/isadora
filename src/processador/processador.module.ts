import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from 'src/pedido/pedido.module';

@Module({
  imports: [ConfigModule, PedidoModule]
})
export class ProcessadorModule { }
