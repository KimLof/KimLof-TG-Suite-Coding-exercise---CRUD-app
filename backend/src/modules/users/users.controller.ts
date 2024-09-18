import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // Lisää käyttäjän
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get() // Etsii kaikki käyttäjät
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') // Etsii tietyn id:n perusteella
  findOne(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.usersService.findOne(numericId);
  }

  @Put(':id')  // Lisää käyttäjän
  update(@Param('id') id: string, @Body() user: User) {
    const numericId = parseInt(id, 10);
    return this.usersService.update(numericId, user);
  }

  @Delete(':id')  // Poistaa käyttäjän
  remove(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    return this.usersService.remove(numericId);
  }
}