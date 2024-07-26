import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from 'db/models/todo.model';
import {
  CreateTodoReceiveRemote,
  CreateTodoResponseRemote,
  UpdateStatusTodoReceiveRemote,
} from './dto';

@Injectable()
export class TodoService {
  private resultOk: CreateTodoResponseRemote = { result: 'ok' };
  constructor(
    @InjectModel(Todo) private readonly todoRepository: typeof Todo,
  ) {}
  async getTasks(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
  async createTask(
    dto: CreateTodoReceiveRemote,
  ): Promise<CreateTodoResponseRemote> {
    const todo = {
      text: dto.text,
    };
    await this.todoRepository.create(todo);
    return this.resultOk;
  }
  async deleteTask(idParam: number): Promise<CreateTodoResponseRemote> {
    await this.todoRepository.destroy({
      where: {
        id: idParam,
      },
    });
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
    await this.todoRepository.update(
      { isChecked: dto.isChecked },
      {
        where: {
          id: idParam,
        },
      },
    );
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
