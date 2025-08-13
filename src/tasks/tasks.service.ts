import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Seguir os passos do curso',
      description: 'Assistir as aulas e praticar o que foi ensinado',
      completed: false,
    },
  ];

  findAll() {
    return this.tasks;
  }

  findOne(id: string) {
    const task = this.tasks.find((task) => task.id === Number(id));

    if (task) {
      return task;
    }

    // throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND); // 1º Tipo de erro
    throw new NotFoundException('Essa tarefa não existe'); // 2º Tipo de erro
  }

  create(body: any) {
    const newId = this.tasks.length + 1;
    const newTask = {
      id: newId,
      ...body,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  update(id: string, body: any) {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0) {
      throw new NotFoundException('Essa tarefa não existe');
    }

    const taskItem = this.tasks[taskIndex];

    this.tasks[taskIndex] = {
      ...taskItem,
      ...body,
    };

    return taskItem;
  }
}
