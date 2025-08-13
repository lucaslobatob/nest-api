/*
    DTO => Data Transfer Object (Objeto de Transferência de Dados)
    > Validar dados, transformar dados, etc.
     > Se usa para validar os dados que estão sendo enviados para o servidor
     > Exemplo: Se o usuário enviar um nome vazio, o DTO pode validar isso e
       retornar um erro antes de chegar no serviço.
*/

export class CreateTaskDto {
  readonly name: string;
  readonly description: string;
}
