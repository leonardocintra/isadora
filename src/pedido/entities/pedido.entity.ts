import { CreatePedidoDto } from "../dto/create-pedido.dto";

export class Pedido {
  pedidoId: string;
  nome: string;
  telefone: string;
  dataPedido: Date;

  static newInstanceFromDynamoDB(data: any): Pedido {
    return Pedido.getResult(data);
  }

  static newInstanceFromDTO(data: CreatePedidoDto): Pedido {
    return Pedido.getResult(data);
  }

  private static getResult(data: CreatePedidoDto) {
    const result = new Pedido();

    result.pedidoId = data.pedidoId;
    result.nome = data.nome;
    result.telefone = data.telefone;
    result.dataPedido = new Date();

    return result;
  }
}
