import { Module } from "@nestjs/common";
import { PedidoService } from "./pedido.service";
import { PedidoRepository } from "./pedido.repository";
import { PedidoSocket } from "./pedido.socket";
import { SnsModule } from "src/sns/sns.module";

@Module({
  providers: [PedidoService, PedidoRepository, PedidoSocket],
  exports: [PedidoService],
  imports: [SnsModule]
})
export class PedidoModule { }
