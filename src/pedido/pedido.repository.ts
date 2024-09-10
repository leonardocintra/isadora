import {
  AttributeValue,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { Pedido } from "./entities/pedido.entity";

@Injectable()
export class PedidoRepository {
  private readonly tableName = "pedido";
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async findById(pedidoId: string) {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: { pedidoId: { S: pedidoId } },
    });

    const result = await this.client.send(command);

    if (result.Item) {
      return Pedido.newInstanceFromDynamoDB(result.Item);
    }

    return undefined;
  }

  async findAll() {
    try {
      const result: Pedido[] = [];
      const command = new ScanCommand({
        TableName: this.tableName,
      });

      const response = await this.client.send(command);

      if (response.Items) {
        response.Items.forEach((item) => {
          result.push(Pedido.newInstanceFromDynamoDB(item));
        });
      }

      return result;
    } catch (err) {
      console.error("Error retrieving items:", err);
      throw err;
    }
  }

  async upsertOne(data: Pedido) {
    const itemObject: Record<string, AttributeValue> = {
      restaurante: {
        S: data.restaurante,
      },
      pedidoId: {
        S: data.pedidoId,
      },
      nome: {
        S: data.nome,
      },
      telefone: {
        S: data.telefone,
      },
      dataPedido: {
        S: data.dataPedido.toLocaleString("pt-BR"),
      },
    };

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: itemObject,
    });

    await this.client.send(command);
    return data;
  }
}
