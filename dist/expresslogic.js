"use strict";
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
const express_1 = __importDefault(require("express"));
const _1 = require(".");
// Initialize the express engine
const app = (0, express_1.default)();
// Take a port 3000 for running server.
const port = 3000;
app.use(express_1.default.json());
// Handling '/' Request
app.get('/', (_req, _res) => {
    _res.send("TypeScript With Express");
});
//signup route
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCreated = yield (0, _1.insertUser)(req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.email);
        if (userCreated !== null) {
            res.status(201).json({ message: 'User created successfully' });
        }
        else {
            res.status(400).json({ message: 'User with this username or email already exists' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express 
         http://localhost:${port}/`);
});
//creating todos
app.post('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoCreated = yield (0, _1.insertTodo)(req.body.title, req.body.description, req.body.done, parseInt(req.params.id));
        res.status(201).json({ 'message': 'Todo Created Successfully' });
    }
    catch (error) {
        res.status(500).json({ "message": 'Internal server error' });
    }
}));
//getting user and todo details
app.get('/info/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield (0, _1.getUser)(req.params.username);
        res.status(200).json({ info });
    }
    catch (error) {
        res.status(500).json({ "message": 'Internal server error' });
    }
}));
//updating the user
app.put('/user/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, _1.updateUser)(req.params.username, req.body.firstName, req.body.lastName);
        res.status(200).json({ response });
    }
    catch (error) {
        res.status(500).json({ "message": 'Internal server error' });
    }
}));
//getting todo
app.get('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, _1.getTodos)(parseInt(req.params.id));
        res.status(200).json({ response });
    }
    catch (error) {
        res.status(500).json({ "message": 'Internal server error' });
    }
}));
