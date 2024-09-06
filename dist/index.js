"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const API_KEY = '123'; // Hardcoded API key for testing
app.use(express_1.default.json());
app.use(express_1.default.static('public', {
    index: false,
    extensions: ['html']
}));
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
// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
