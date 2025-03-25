"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("../auth/entities/user.entity");
const crypto = require("crypto");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findOne(username) {
        return this.userModel.findOne({
            where: {
                username: username,
            },
        });
    }
    async checkUserExistsByUsername(username) {
        const user = await this.userModel.findOne({ where: { username } });
        return !!user;
    }
    async checkUserExistsByEmail(email) {
        const user = await this.userModel.findOne({ where: { email } });
        return !!user;
    }
    async amd5Hash(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
    async verifyMd5Hash(data, hashed) {
        const hash = crypto.createHash('md5').update(data).digest('hex');
        return hash === hashed;
    }
    async createUser(data) {
        return this.userModel.create(data);
    }
    async findAll() {
        return this.userModel.findAll();
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map