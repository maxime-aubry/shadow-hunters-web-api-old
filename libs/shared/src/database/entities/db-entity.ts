import { PrimaryGeneratedColumn } from 'typeorm';

export class DbEntity {
  constructor(id: string) {
    this.id = id;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;
}
