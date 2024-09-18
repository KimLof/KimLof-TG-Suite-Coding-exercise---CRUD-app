export interface User {
    id: number;
    name: string;
    createdAt: string;
    events?: Event[];
  }