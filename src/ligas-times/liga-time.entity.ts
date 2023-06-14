import { Liga } from "src/ligas/liga.entity";
import { User } from "src/users/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ligas_times')
export class LigaTime {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Liga, liga => liga.times)
    @JoinColumn({ name: 'liga_id' })
    liga: Liga;

    @ManyToOne(() => User, user => user.ligas_time)
    @JoinColumn({ name: 'time_id' })
    time: User;
}
