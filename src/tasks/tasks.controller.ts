import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
}
