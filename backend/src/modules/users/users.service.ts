import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { User } from './user.entity';
import { join } from 'path';

@Injectable()
export class UsersService {
  private readonly filePath = join(__dirname, '../../../data.json');
  
  private getData() {
    const data = JSON.parse(readFileSync(this.filePath, 'utf8'));
    return data;
  }

  private saveData(data: any) {
    writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  create(user: User) {
    const data = this.getData();
    user.id = (data.users.length ? Math.max(...data.users.map(u => u.id)) + 1 : 1);
    user.createdAt = new Date().toISOString();
    data.users.push(user);
    this.saveData(data);
    return user;
  }

  findAll() {
    const data = this.getData();
    return data.users;
  }

  findOne(id: number) {
    const data = this.getData();
    return data.users.find(user => user.id === id);
  }

  update(id: number, updatedUser: User) {
    const data = this.getData();
    const userIndex = data.users.findIndex(user => user.id === id);
    if (userIndex > -1) {
      data.users[userIndex] = { ...data.users[userIndex], ...updatedUser };
      this.saveData(data);
      return data.users[userIndex];
    }
    return null;
  }

  remove(id: number) {
    const data = this.getData();
    data.users = data.users.filter(user => user.id !== id);
    data.events = data.events.filter(event => event.userId !== id); // Remove related events
    this.saveData(data);
  }
}