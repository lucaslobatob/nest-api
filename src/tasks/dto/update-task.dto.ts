import { IsBoolean, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  // O PartialType cria automaticamente as propriedades opcionais
  // baseando-se no CreateTaskDto, então não é necessário repetir as validações aqui.

  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;
}
