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
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto || {};

    const allTasks = await this.prisma.task.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        id: 'desc',
      },
    });
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

  async create(createTaskDto: CreateTaskDto) {
    const newtask = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        completed: false,
      },
    });

    return newtask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const findTask = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (!findTask) {
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
    }

    const task = await this.prisma.task.update({
      where: {
        id: findTask.id,
      },
      data: updateTaskDto,
    });

    return task;
  }

  async delete(id: number) {
    const findTask = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });
    if (!findTask) {
      throw new NotFoundException('Essa tarefa não existe');
    }
    await this.prisma.task.delete({
      where: {
        id: findTask.id,
      },
    });
    return { message: 'Tarefa deletada com sucesso' };
  }
}
