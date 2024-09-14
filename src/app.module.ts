import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScheduleModule } from "@nestjs/schedule";
import { ProcessadorService } from "./processador/processador.service";
import { SqsModule } from "@ssut/nestjs-sqs";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProcessadorModule } from "./processador/processador.module";
import config from "./config";
import { SQSClient } from "@aws-sdk/client-sqs";
import { PedidoModule } from "./pedido/pedido.module";
import { SnsModule } from './sns/sns.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    ScheduleModule.forRoot(),
    SqsModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const accessKeyId = configService.get<string>("aws.accessKeyId");
        const secretAccessKey = configService.get<string>(
          "aws.secretAccessKey",
        );

        return {
          consumers: [
            {
              name: configService.get<string>("aws.queue_name"),
              queueUrl: configService.get<string>("aws.url"),
              region: configService.get<string>("aws.region"),
              batchSize: 10,
              maxNumberOfMessages: 10,
              visibilityTimeout: 30,
              waitTimeSeconds: 20,
              sqs: new SQSClient({
                region: configService.get<string>("aws.region"),
                credentials: {
                  accessKeyId,
                  secretAccessKey,
                },
              }),
            },
          ],
        };
      },
      inject: [ConfigService],
    }),
    ProcessadorModule,
    PedidoModule,
    SnsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProcessadorService],
})
export class AppModule {}
