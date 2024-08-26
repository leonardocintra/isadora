import { Message } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class ProcessadorService {
  private readonly logger = new Logger(ProcessadorService.name);

  constructor(private readonly configService: ConfigService) { }

  @Cron(CronExpression.EVERY_10_HOURS)
  handleCron() {
    this.logger.debug('Executando processamento...');
  }

  @SqsMessageHandler('restaurante-pedidos-do-cliente', false)
  async handleMessage(message: Message) {
    const msgBody: any = JSON.parse(message.Body);

    console.log(`Consumindo mensagem ... - ${JSON.stringify(msgBody)}`);
  }
}
