
import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { Event } from './event.entity';
import { join } from 'path';

@Injectable()
export class EventsService {
  private readonly filePath = join(__dirname, '../../../data.json');
  
  private getData() {
    const data = JSON.parse(readFileSync(this.filePath, 'utf8'));
    return data;
  }

  private saveData(data: any) {
    writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  create(event: Event) {
    const data = this.getData();
    event.id = (data.events.length ? Math.max(...data.events.map(e => e.id)) + 1 : 1);
    event.createdAt = new Date().toISOString();
    data.events.push(event);
    this.saveData(data);
    return event;
  }

  findAll() {
    const data = this.getData();
    return data.events;
  }

  findOne(id: number) {
    const data = this.getData();
    return data.events.find(event => event.id === id);
  }

  remove(id: number) {
    const data = this.getData();
    data.events = data.events.filter(event => event.id !== id);
    this.saveData(data);
  }
}
