import { User } from '../auth/entities/user.entity';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: typeof User);
    findOne(username: string): Promise<User | undefined>;
    checkUserExistsByUsername(username: string): Promise<boolean>;
    checkUserExistsByEmail(email: string): Promise<boolean>;
    amd5Hash(data: string): Promise<string>;
    verifyMd5Hash(data: string, hashed: string): Promise<boolean>;
    createUser(data: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    remove(id: number): string;
}
