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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const web3_js_1 = require("@solana/web3.js");
const generateKeys = () => {
    try {
        // Generate a new Solana keypair
        const keypair = web3_js_1.Keypair.generate();
        // Convert keypair to JSON format
        const secretKey = Array.from(keypair.secretKey); // Convert to array
        const publicKey = keypair.publicKey.toBase58();
        // Save keys to files
        fs.writeFileSync('solana-secret-key.json', JSON.stringify({ secretKey }, null, 2));
        fs.writeFileSync('solana-public-key.txt', publicKey);
        console.log('Keys generated and saved successfully.');
    }
    catch (error) {
        console.error('Error generating keys:', error);
    }
};
generateKeys();
