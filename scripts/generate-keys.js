"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const generateKeyPair = () => {
    // Generate a key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
    // Save the keys to .env file
    fs_1.default.writeFileSync(path_1.default.join(__dirname, '../.env'), `SECRET_KEY=${privateKey.export({ type: 'pkcs8', format: 'pem' })}`);
    console.log('Key pair generated and saved to .env');
};
generateKeyPair();
