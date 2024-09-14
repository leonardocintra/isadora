import { Injectable } from "@nestjs/common";
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import { UpdatePedidoDto } from "./dto/update-pedido.dto";
import { PedidoRepository } from "./pedido.repository";
import { Pedido } from "./entities/pedido.entity";
import { PedidoSocket } from "./pedido.socket";
import { SnsService } from "src/sns/sns.service";

@Injectable()
export class PedidoService {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly socket: PedidoSocket,
    private readonly snsService: SnsService,
  ) { }

  async create(createPedidoDto: CreatePedidoDto) {
    const pedido = await this.pedidoRepository.upsertOne(
      Pedido.newInstanceFromDTO(createPedidoDto),
    );

    this.socket.avisarNovoPedidoGerado(pedido);

    await this.snsService.publishMessage(JSON.stringify(pedido), {
      PedidoId: pedido.pedidoId,
      StatusId: 2
    });

    return pedido;
  }

  findAll() {
    return this.pedidoRepository.findAll();
  }

  findOne(pedidoId: string) {
    return this.pedidoRepository.findById(pedidoId);
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
