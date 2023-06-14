import { Liga } from "src/ligas/liga.entity";
import { User } from "src/users/user.entity";

export class CreateLigaTimeDto {
    liga: Liga;
    time: User;
}
