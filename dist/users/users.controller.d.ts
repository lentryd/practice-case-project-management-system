import { UsersService } from './users.service';
import UserUpdateDto from './dto/user-update.dto';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    findAll(): Promise<{
        id: string;
        name: string | null;
        email: string;
    }[]>;
    findOne(id: string, req: any): any;
    update(id: string, req: any, updateDto: UserUpdateDto): Promise<{
        id: string;
        name: string | null;
        email: string;
    }>;
    delete(id: string, req: any): Promise<void>;
}
