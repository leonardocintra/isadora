import { Message } from "@aws-sdk/client-sqs";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SqsMessageHandler } from "@ssut/nestjs-sqs";
import { CreatePedidoDto } from "src/pedido/dto/create-pedido.dto";
import { PedidoService } from "src/pedido/pedido.service";

@Injectable()
export class ProcessadorService {
  private readonly logger = new Logger(ProcessadorService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly pedidoService: PedidoService,
  ) { }

  @Cron(CronExpression.EVERY_10_HOURS)
  handleCron() {
    // TODO: excluir pedidos de datas anteriores
    this.logger.debug("Executando processamento...");
  }

  @SqsMessageHandler("restaurante-pedidos-do-cliente", false)
  async handleMessage(message: Message) {
    const sns = JSON.parse(message.Body);
    const msgSns = JSON.parse(sns.Message);

    const pedido = msgSns.pedido;
    const nome = msgSns.nome;
    const telefone = msgSns.telefone;
    const restaurante = msgSns.restaurante;
    const items = msgSns.items;

    // TODO: salvar pedido no dynamodb
    this.logger.log(`== Novo pedido: ${pedido}`);

    const pedidoDto: CreatePedidoDto = {
      restaurante,
      pedidoId: pedido,
      nome,
      telefone,
      items
    };

    await this.pedidoService.create(pedidoDto);

    // TODO: processar pedido (ex: enviar email, notificar garçom, etc.)

    this.logger.log(`Mensagem Ok. Pedido: ${pedido}`);
  }
}
