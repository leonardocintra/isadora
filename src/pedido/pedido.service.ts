import { Injectable, Logger } from "@nestjs/common";
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import { UpdatePedidoDto } from "./dto/update-pedido.dto";
import { PedidoRepository } from "./pedido.repository";
import { Pedido } from "./entities/pedido.entity";
import { PedidoSocket } from "./pedido.socket";
import { SnsService } from "src/sns/sns.service";

@Injectable()
export class PedidoService {

  private readonly logger = new Logger(PedidoService.name);

  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly socket: PedidoSocket,
    private readonly snsService: SnsService,
  ) { }

  async create(createPedidoDto: CreatePedidoDto) {
    try {

      if (createPedidoDto.items.length < 1) {
        this.logger.warn(`O pedido ${createPedidoDto.pedidoId} do restuarante ${createPedidoDto.restaurante} sera descartado pois não teve itens`);
        // TODO: cancelar o pedido
        return null;
      }

      const pedido = await this.pedidoRepository.upsertOne(
        Pedido.newInstanceFromDTO(createPedidoDto),
      );

      this.socket.avisarNovoPedidoGerado(pedido);

      await this.snsService.publishMessage(JSON.stringify(pedido), {
        PedidoId: pedido.pedidoId,
        StatusId: 2
      });

      return pedido;
    } catch (error) {
      console.error('Error ao cadastrar pedido:', error);
      throw error;
    }
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
