import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EventsService } from './events.services';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()  // Uusi event
  create(@Body() event: any) {
    return this.eventsService.create(event);
  }

  @Get() // Etsii kaikki eventit
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')  // Etsii tietyn
  findOne(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }
}
