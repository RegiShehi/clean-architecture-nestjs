import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column({ select: false })
  public password: string;

  @Column({ nullable: true })
  public firstName: string;

  @Column({ nullable: true })
  public lastName: string;

  @Column({ nullable: true })
  public refreshToken: string;
}

export { UserEntity };
