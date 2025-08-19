import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {
    // O PrismaService é injetado aqui para ser usado nas operações de banco de dados
  }

  private tasks: Task[] = [
    {
      id: 1,
      name: 'Seguir os passos do curso',
      description: 'Assistir as aulas e praticar o que foi ensinado',
      completed: false,
    },
  ];

  async findAll() {
    const allTasks = await this.prisma.task.findMany();
    return allTasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (task?.name) return task;

    throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
  }

  create(createTaskDto: CreateTaskDto) {
    const newId = this.tasks.length + 1;
    const newTask = {
      id: newId,
      ...createTaskDto,
      completed: false,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex < 0) {
      throw new NotFoundException('Essa tarefa não existe');
    }

    const taskItem = this.tasks[taskIndex];

    this.tasks[taskIndex] = {
      ...taskItem,
      ...updateTaskDto,
    };

    return taskItem;
  }

  delete(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex < 0) {
      throw new NotFoundException('Essa tarefa não existe');
    }

    this.tasks.splice(taskIndex, 1);
    return `Tarefa com o ID: ${id} deletada com sucesso`;
  }
}
