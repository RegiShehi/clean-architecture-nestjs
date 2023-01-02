import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
class BookEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;
}

export { BookEntity };
