"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
const environments_config_1 = __importDefault(require("../environments.config"));
class ExtendedClient extends discord_js_1.Client {
    constructor() {
        super(...arguments);
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.environment = environments_config_1.default;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.login(this.environment.TOKEN);
            const baseCommandPath = (0, path_1.join)(__dirname, "..", "Commands");
            (0, fs_1.readdirSync)(baseCommandPath).forEach(dir => {
                const files = (0, fs_1.readdirSync)(`${baseCommandPath}/${dir}`).filter(file => file.endsWith("js"));
                for (const file of files) {
                    const { command } = require(`${baseCommandPath}/${dir}/${file}`);
                    this.commands.set(command.payload.name, command);
                    console.log(chalk_1.default.bold.green(`Loaded Command: ${command.payload.name}`));
                }
            });
            const baseEventPath = (0, path_1.join)(__dirname, "..", "Events");
            (0, fs_1.readdirSync)(baseEventPath).forEach((file) => __awaiter(this, void 0, void 0, function* () {
                const { event } = yield Promise.resolve().then(() => __importStar(require(`${baseEventPath}/${file}`)));
                this.events.set(event.name, event);
                console.log(chalk_1.default.bold.magenta(`Listened Event: ${event.name}`));
                this.on(event.name, event.exe.bind(null, this));
            }));
        });
    }
}
exports.default = ExtendedClient;
