import { MasterCity } from './entities/master.city';
export declare class MasterService {
    private readonly masterCity;
    private readonly logger;
    constructor(masterCity: typeof MasterCity);
    findAllMasterCity(): Promise<MasterCity[]>;
}
