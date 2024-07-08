import LoginDto from './auth.dto';
import { CreateUserDto } from '../users/users.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    register(dto: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
