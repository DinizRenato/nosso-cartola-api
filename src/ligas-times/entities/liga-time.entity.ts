import { Liga } from "../../ligas/entities/liga.entity";
import { User } from "../../users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('ligas_times')
export class LigaTime {

    @PrimaryColumn()
    liga_id: number;

    @PrimaryColumn()
    time_id: number;

    @ManyToOne(() => Liga, liga => liga.times)
    @JoinColumn({ name: 'liga_id' })
    liga: Liga;

    @ManyToOne(() => User, user => user.ligas)
    @JoinColumn({ name: 'time_id' })
    time: User;
}
