import { MasterService } from './master.service';
export declare class MasterController {
    private masterService;
    constructor(masterService: MasterService);
    findAll(): Promise<{
        status: string;
        statusCode: number;
        data: any;
    }>;
}
