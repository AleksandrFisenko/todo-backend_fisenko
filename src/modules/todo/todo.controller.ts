import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { ResponceDTO } from './dto/responce.dto';
import { UpdateAllDTO } from './dto/update-all.dto';
import { UpdateStatusDTO, UpdateTextDTO } from './dto/update-todo.dto';

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
  deleteTask(@Param('id') id: number): Promise<ResponceDTO> {
    return this.todoService.deleteTask(id);
  }

  @Delete()
  deleteCompleted(): Promise<ResponceDTO> {
    return this.todoService.deleteAllCheckedTasks();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateTextDTO | UpdateStatusDTO,
  ): Promise<ResponceDTO> {
    return this.todoService.updateTaskById(id, dto);
  }

  @Put()
  updateStatusForAll(@Body() dto: UpdateAllDTO): Promise<ResponceDTO> {
    return this.todoService.updateStatusForAll(dto);
  }
}
