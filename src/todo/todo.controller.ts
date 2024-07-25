import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTasks() {
    return this.todoService.getTasks();
  }

  @Post()
  createTasks(@Body() dto: CreateTodoDTO) {
    console.log(dto);
    return this.todoService.createTask(dto);
  }
}
