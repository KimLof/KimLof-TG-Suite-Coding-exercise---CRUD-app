// src/modules/events/events.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.services';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() event: Event) {
    return this.eventsService.create(event);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventsService.remove(id);
  }
}
