import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Book {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;
}

export default Book;
