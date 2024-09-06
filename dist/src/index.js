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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const web3_js_1 = require("@solana/web3.js");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const port = 3000;
const API_KEY = '123'; // Hardcoded API key for testing
const SOLANA_SECRET_KEY = JSON.parse(process.env.SOLANA_SECRET_KEY || '[]');
const connection = new web3_js_1.Connection('https://api.devnet.solana.com', 'confirmed');
const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(SOLANA_SECRET_KEY));
// Middleware to authenticate the API key from query parameters
function authenticate(req, res, next) {
    const apiKey = req.query.apiKey; // Get the API key from the query parameters
    console.log('Expected API Key:', API_KEY);
    console.log('Received API Key:', apiKey);
    if (apiKey === API_KEY) {
        next();
    }
    else {
        console.log('Unauthorized attempt with API Key:', apiKey);
        res.status(401).json({ message: 'Unauthorized' });
    }
}
// Route for success page (authenticated)
app.get('/success', authenticate, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../protected/success.html'));
});
// Route to handle transaction requests
app.post('/api/transfer', authenticate, async (req, res) => {
    const { recipient, amount } = req.body;
    if (!recipient || !amount) {
        return res.status(400).json({ message: 'Recipient and amount are required.' });
    }
    try {
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: new web3_js_1.PublicKey(recipient),
            lamports: amount * web3_js_1.LAMPORTS_PER_SOL, // Convert SOL to lamports
        }));
        const signature = await connection.sendTransaction(transaction, [keypair], { skipPreflight: false });
        await connection.confirmTransaction(signature);
        res.json({ message: 'Transaction successful', signature });
    }
    catch (error) {
        console.error('Transaction failed:', error);
        res.status(500).json({ message: 'Transaction failed', error });
    }
});
// Route to get the balance of the wallet
app.get('/api/balance', authenticate, async (req, res) => {
    try {
        const balance = await connection.getBalance(keypair.publicKey);
        res.json({ balance: balance / 1e9 }); // Convert lamports to SOL
    }
    catch (error) {
        console.error('Failed to fetch balance:', error);
        res.status(500).json({ message: 'Failed to fetch balance', error });
    }
});
// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
