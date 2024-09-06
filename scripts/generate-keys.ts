import * as fs from 'fs';
import { Keypair } from '@solana/web3.js';

const generateKeys = () => {
    try {
        // Generate a new Solana keypair
        const keypair = Keypair.generate();
        
        // Convert keypair to JSON format
        const secretKey = Array.from(keypair.secretKey); // Convert to array
        const publicKey = keypair.publicKey.toBase58();
        
        // Save keys to files
        fs.writeFileSync('solana-secret-key.json', JSON.stringify({ secretKey }, null, 2));
        fs.writeFileSync('solana-public-key.txt', publicKey);

        console.log('Keys generated and saved successfully.');
    } catch (error) {
        console.error('Error generating keys:', error);
    }
};

generateKeys();
