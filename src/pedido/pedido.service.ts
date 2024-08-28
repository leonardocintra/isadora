import { Injectable } from "@nestjs/common";
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import { UpdatePedidoDto } from "./dto/update-pedido.dto";
import { PedidoRepository } from "./pedido.repository";
import { Pedido } from "./entities/pedido.entity";

@Injectable()
export class PedidoService {
  constructor(private readonly pedidoRepository: PedidoRepository) {}

  create(createPedidoDto: CreatePedidoDto) {
    return this.pedidoRepository.upsertOne(
      Pedido.newInstanceFromDTO(createPedidoDto),
    );
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
