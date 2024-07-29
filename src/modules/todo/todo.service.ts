import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';
import { AppError } from 'src/common/errors';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { ResponceDTO } from './dto/responce.dto';

@Injectable()
export class TodoService {
  private resultOk: ResponceDTO = { result: 'ok' };
  private resultFailed: ResponceDTO = { result: 'failed' };

  constructor(
    @InjectModel(Todo) private readonly todoRepository: typeof Todo,
  ) {}

  async getTasks(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async createTask(dto: CreateTodoDTO): Promise<ResponceDTO> {
    const a = await this.todoRepository.create({
      text: dto.text,
    });
    console.log(a);
    return this.resultOk;
  }

  async deleteTask(idParam: number): Promise<ResponceDTO> {
    const a = await this.todoRepository.destroy({
      where: {
        id: idParam,
      },
    });
    if (!a) throw new NotFoundException(AppError.TODO_NOT_FOUND);
    return this.resultOk;
  }

  async deleteAllCheckedTasks(): Promise<ResponceDTO> {
    await this.todoRepository.destroy({
      where: {
        isChecked: true,
      },
    });
    return this.resultOk;
  }

  async updateStatusById(
    idParam: number,
    dto: UpdateTodoDTO,
  ): Promise<ResponceDTO> {
    const a = await this.todoRepository.update(
      {
        text: dto.text,
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

  async updateStatusForAll(isCheckedParam: boolean): Promise<ResponceDTO> {
    await this.todoRepository.update(
      { isChecked: isCheckedParam },
      { where: {} },
    );
    return this.resultOk;
  }
}
