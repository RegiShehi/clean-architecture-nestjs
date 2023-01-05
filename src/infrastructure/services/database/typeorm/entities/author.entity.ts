import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authors')
class AuthorEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;
}

export { AuthorEntity };
