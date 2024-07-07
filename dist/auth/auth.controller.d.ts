import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    register(dto: RegisterDto): Promise<{
        access_token: string;
    }>;
}
