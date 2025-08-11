import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  listAllTasks() {
    return [
      { id: 1, title: 'Task 1', description: 'Description for Task 1' },
      { id: 2, title: 'Task 2', description: 'Description for Task 2' },
      { id: 3, title: 'Task 3', description: 'Description for Task 3' },
    ];
  }

  findOneTask() {
    return 'Tarefa encontrada';
  }
}
