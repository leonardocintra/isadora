import { CreatePedidoDto } from "../dto/create-pedido.dto";

export class Pedido {
  restaurante: string;
  pedidoId: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  dataPedido: Date;
  items: string[];

  static newInstanceFromDynamoDB(data: any): Pedido {
    return Pedido.getResult(data);
  }

  static newInstanceFromDTO(data: CreatePedidoDto): Pedido {
    return Pedido.getResult(data);
  }

  private static getResult(data: CreatePedidoDto) {
    const result = new Pedido();

    result.restaurante = data.restaurante;
    result.pedidoId = data.pedidoId;
    result.nome = data.nome;
    result.sobrenome = data.sobrenome;
    result.telefone = data.telefone;
    result.dataPedido = new Date();
    result.items = data.items;

    return result;
  }
}
