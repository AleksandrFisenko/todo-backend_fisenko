import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';
import { AppError } from 'src/common/errors';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { ResponceDTO } from './dto/responce.dto';
import { UpdateAllDTO } from './dto/update-all.dto';
import { UpdateStatusDTO, UpdateTextDTO } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private resultOk: ResponceDTO = { result: 'ok' };

  constructor(
    @InjectModel(Todo) private readonly todoRepository: typeof Todo,
  ) {}

  async getTasks(): Promise<Todo[]> {
    return this.todoRepository.findAll({
      order: [['id', 'ASC']],
    });
  }

  async createTask(dto: CreateTodoDTO): Promise<ResponceDTO> {
    try {
      const a = await this.todoRepository.create({
        text: dto.text,
      });
      return a.dataValues;
    } catch (e) {
      throw new BadRequestException(AppError.TEXT_IS_EMPTY);
    }
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

  isUpdateTextDTO(dto: UpdateTextDTO | UpdateStatusDTO): dto is UpdateTextDTO {
    return (dto as UpdateTextDTO).text !== undefined;
  }

  isUpdateStatusDTO(
    dto: UpdateTextDTO | UpdateStatusDTO,
  ): dto is UpdateStatusDTO {
    return (dto as UpdateStatusDTO).isChecked !== undefined;
  }

  async updateTaskById(
    idParam: number,
    dto: UpdateTextDTO | UpdateStatusDTO,
  ): Promise<ResponceDTO> {
    if (this.isUpdateTextDTO(dto)) {
      const a = await this.todoRepository.update(
        {
          text: dto.text,
        },
        {
          where: {
            id: idParam,
          },
        },
      );
      if (!a[0]) throw new NotFoundException(AppError.TODO_NOT_FOUND);
    }
    if (this.isUpdateStatusDTO(dto)) {
      const a = await this.todoRepository.update(
        {
          isChecked: dto.isChecked,
        },
        {
          where: {
            id: idParam,
          },
        },
      );
      if (!a[0]) throw new NotFoundException(AppError.TODO_NOT_FOUND);
    }
    return this.resultOk;
  }

  async updateStatusForAll(dto: UpdateAllDTO): Promise<ResponceDTO> {
    await this.todoRepository.update({ isChecked: dto.status }, { where: {} });
    return this.resultOk;
  }
}
