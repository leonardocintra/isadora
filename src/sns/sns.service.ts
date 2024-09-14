import { Injectable, Logger } from "@nestjs/common";
import { PublishCommand, PublishInput, SNSClient } from "@aws-sdk/client-sns";

@Injectable()
export class SnsService {
  private readonly snsClient: SNSClient;
  private readonly logger = new Logger(SnsService.name);

  constructor() {
    this.snsClient = new SNSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async publishMessage(message: string, attributes: Record<string, any>) {
    const messageAttributes = Object.entries(attributes).reduce((acc, [key, value]) => {
      acc[key] = {
        DataType: typeof value === 'string' ? 'String' : 'Number',
        StringValue: value.toString(),
      };
      return acc;
    }, {});    

    const params: PublishInput = {
      TopicArn: process.env.AWS_PEDIDO_SNS_TOPIC,
      Message: message,
      Subject: "Pedido criado no banco de dados",
      MessageAttributes: messageAttributes
    };

    try {
      const command = new PublishCommand(params);
      const response = await this.snsClient.send(command);
      this.logger.log(`Message sent to SNS: ${response.MessageId}`);
      return response;
    } catch (error) {
      this.logger.error(`Failed to send message to SNS: ${error.message}`);
      throw error;
    }
  }
}
