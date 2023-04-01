import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  public id: number;

  @AutoMap()
  @Column({ unique: true })
  public email: string;

  @AutoMap()
  @Column({ select: false })
  public password: string;

  @AutoMap()
  @Column({ nullable: true })
  public firstName: string;

  @AutoMap()
  @Column({ nullable: true })
  public lastName: string;

  @AutoMap()
  @Column({ nullable: true })
  public refreshToken: string;
}

export { UserEntity };
