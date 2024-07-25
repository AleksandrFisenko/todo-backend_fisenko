import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from 'db/models/todo.model';
import { CreateTodoDTO } from './dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo) private readonly todoRepository: typeof Todo,
  ) {}
  getTasks(): string {
    return 'gg';
  }
  async createTask(dto: CreateTodoDTO): Promise<CreateTodoDTO> {
    const todo = {
      text: dto.text,
    };
    await this.todoRepository.create(todo);
    return dto;
  }
}
