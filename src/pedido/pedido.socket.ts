import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Pedido } from './entities/pedido.entity';

@WebSocketGateway({
  cors: {
    origin: "https://restaurante-adminsite.ypg4r9.easypanel.host", //"http://localhost:3000",
    methods: ['GET', 'POST'],
  }
})
export class PedidoSocket
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log("WebSocket - Cliente conectado")
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`WebSocket - Cliente handleConnection, ${client.id}`)
  }

  handleDisconnect(client: any) {
    console.log(`WebSocket - Cliente handleDisconnect, ${client.id}`)
  }

  avisarNovoPedidoGerado(pedido: Pedido) {
    console.log(`WebSocket - Novo pedido gerado: ${JSON.stringify(pedido.restaurante)}: ${JSON.stringify(pedido.pedidoId)}`)
    this.server.emit('novo-pedido-gerado', pedido);
  }
}