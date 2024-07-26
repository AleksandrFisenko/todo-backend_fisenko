import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from 'db/models/todo.model';
import {
  CreateTodoReceiveRemote,
  CreateTodoResponseRemote,
  UpdateStatusTodoReceiveRemote,
} from './dto';
import { AppError } from 'src/common/errors';

@Injectable()
export class TodoService {
  private resultOk: CreateTodoResponseRemote = { result: 'ok' };
  private resultFailed: CreateTodoResponseRemote = { result: 'failed' };

  constructor(
    @InjectModel(Todo) private readonly todoRepository: typeof Todo,
  ) {}

  async getTasks(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async createTask(
    dto: CreateTodoReceiveRemote,
  ): Promise<CreateTodoResponseRemote> {
    await this.todoRepository.create({
      text: dto.text,
    });
    return this.resultOk;
  }

  async deleteTask(idParam: number): Promise<CreateTodoResponseRemote> {
    const a = await this.todoRepository.destroy({
      where: {
        id: idParam,
      },
    });
    if (!a) throw new NotFoundException(AppError.TODO_NOT_FOUND);
    return this.resultOk;
  }

  async deleteAllCheckedTasks(): Promise<CreateTodoResponseRemote> {
    await this.todoRepository.destroy({
      where: {
        isChecked: true,
      },
    });
    return this.resultOk;
  }

  async updateStatusById(
    idParam: number,
    dto: UpdateStatusTodoReceiveRemote,
  ): Promise<CreateTodoResponseRemote> {
    const a = await this.todoRepository.update(
      {
        // text: dto.text,
        isChecked: dto.isChecked,
      },
      {
        where: {
          id: idParam,
        },
      },
    );
    if (!a[0]) throw new NotFoundException(AppError.TODO_NOT_FOUND);
    return this.resultOk;
  }

  async updateStatusForAll(
    isCheckedParam: boolean,
  ): Promise<CreateTodoResponseRemote> {
    await this.todoRepository.update(
      { isChecked: isCheckedParam },
      { where: {} },
    );
    return this.resultOk;
  }
}
