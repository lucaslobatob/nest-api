import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.listAllTasks();
  }

  @Get('/1')
  getTeste() {
    return this.tasksService.findOneTask();
  }
}
