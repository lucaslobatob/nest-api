/*
    DTO => Data Transfer Object (Objeto de Transferência de Dados)
    > Validar dados, transformar dados, etc.
     > Se usa para validar os dados que estão sendo enviados para o servidor
     > Exemplo: Se o usuário enviar um nome vazio, o DTO pode validar isso e
       retornar um erro antes de chegar no serviço.
*/

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MinLength(5)
  readonly description: string;
}
