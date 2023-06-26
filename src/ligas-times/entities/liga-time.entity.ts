import { Exclude } from "class-transformer";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Liga } from "../../ligas/entities/liga.entity";
import { User } from "../../users/entities/user.entity";

@Entity('ligas_times')
export class LigaTime {

    @PrimaryColumn()
    @Exclude()
    liga_id: number;

    @PrimaryColumn()
    @Exclude()
    time_id: number;

    // @ManyToOne(() => Liga, liga => liga.times)
    // @JoinColumn({ name: 'liga_id' })
    // liga: Liga;

    // @ManyToOne(() => User, user => user.ligas)
    // @JoinColumn({ name: 'time_id' })
    // time: User;
}
