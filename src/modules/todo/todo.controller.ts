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
import {
  CreateTodoReceiveRemote,
  CreateTodoResponseRemote,
  UpdateStatusTodoReceiveRemote,
} from './dto';
import { Todo } from 'db/models/todo.model';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTasks(): Promise<Todo[]> {
    return this.todoService.getTasks();
  }

  @Post()
  createTasks(
    @Body() dto: CreateTodoReceiveRemote,
  ): Promise<CreateTodoResponseRemote> {
    return this.todoService.createTask(dto);
  }

  @Delete(':id')
  // eslint-disable-next-line prettier/prettier
  deleteTask(
    @Param('id') id: number,
  ): Promise<CreateTodoResponseRemote> {
    return this.todoService.deleteTask(id);
  }

  @Delete()
  deleteCompleted(): Promise<CreateTodoResponseRemote> {
    return this.todoService.deleteAllCheckedTasks();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateStatusTodoReceiveRemote,
  ): Promise<CreateTodoResponseRemote> {
    return this.todoService.updateStatusById(id, dto);
  }

  @Put()
  updateStatusForAll(
    @Query('isChecked') isChecked: boolean,
  ): Promise<CreateTodoResponseRemote> {
    return this.todoService.updateStatusForAll(isChecked);
  }
}
