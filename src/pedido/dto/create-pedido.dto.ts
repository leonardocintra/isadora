import { IsArray, IsNumberString, IsString } from "class-validator";

export class CreatePedidoDto {
  @IsString()
  restaurante: string;

  @IsString()
  pedidoId: string;

  @IsString()
  nome: string;

  @IsString()
  sobrenome: string;

  @IsNumberString()
  telefone: string;

  @IsArray()
  items: string[];
}
