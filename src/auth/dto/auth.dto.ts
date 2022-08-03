import { IsString, Max, Min } from 'class-validator';

/** data transfer object (объект передачи данных) */
export class AuthDto {
    @IsString()
    login: string;

    @IsString()
    password: string;
}
