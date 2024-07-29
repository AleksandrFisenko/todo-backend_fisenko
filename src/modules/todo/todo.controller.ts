import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { ResponceDTO } from './dto/responce.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTasks(): Promise<Todo[]> {
    return this.todoService.getTasks();
  }

  @Post()
  createTasks(@Body() dto: CreateTodoDTO): Promise<ResponceDTO> {
    return this.todoService.createTask(dto);
  }

  @Delete(':id')
  // eslint-disable-next-line prettier/prettier
  deleteTask(
    @Param('id') id: number,
  ): Promise<ResponceDTO> {
    return this.todoService.deleteTask(id);
  }

  @Delete()
  deleteCompleted(): Promise<ResponceDTO> {
    return this.todoService.deleteAllCheckedTasks();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateTodoDTO,
  ): Promise<ResponceDTO> {
    return this.todoService.updateStatusById(id, dto);
  }

  @Put()
  updateStatusForAll(
    @Query('isChecked') isChecked: boolean,
  ): Promise<ResponceDTO> {
    return this.todoService.updateStatusForAll(isChecked);
  }
}
