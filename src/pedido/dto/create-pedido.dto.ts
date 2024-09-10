import { IsNumberString, IsString } from "class-validator";

export class CreatePedidoDto {
  @IsString()
  restaurante: string;

  @IsString()
  pedidoId: string;

  @IsString()
  nome: string;

  @IsNumberString()
  telefone: string;
}
