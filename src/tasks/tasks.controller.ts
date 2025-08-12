import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAllTasks() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOneTask(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  createTask(@Body() body: string) {
    console.log(body);
    return this.tasksService.create(body);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: any) {
    console.log('ID: ', id);
    console.log('Body: ', body);
    return 'Tarefa atualizada com sucesso';
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    console.log('ID da tarefa a ser deletada: ', id);
    return `Tarefa com o ID: ${id} deletada com sucesso`;
  }
}
