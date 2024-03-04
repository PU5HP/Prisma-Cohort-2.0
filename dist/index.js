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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//user create
function insertUser(username, password, firstName, lastName, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName,
                email
            }
        });
        console.log(response);
    });
}
//insertUser('user4','user4','user4','user4','user4');
/*Todo create*/
function insertTodo(title, description, done, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.todo.create({
            data: {
                title,
                description,
                done,
                userId
            }
        });
        console.log('todo-inserted:', response);
    });
}
//insertTodo('user4.1-title','user-4.1-des',false,4);
//a function that let’s you fetch the details of a user given their username @unique
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.findFirst({
            where: {
                username: username
            }
        });
        const userTodo = yield prisma.todo.findMany({
            where: {
                userId: response === null || response === void 0 ? void 0 : response.id
            }
        });
        console.log("user details:", response);
        console.log("user todos:", userTodo);
    });
}
//getUser('user4')
// update the first and last name of the user
function updateUser(username, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        //find if username exists in DB
        const response = yield prisma.user.findFirst({
            where: {
                username: username
            }
        });
        if (response === null) {
            console.log('Not updated : wrong username');
            return;
        }
        const updatedUserDetails = yield prisma.user.update({
            where: { username: response.username },
            data: {
                firstName,
                lastName
            }
        });
        console.log('old details:', response);
        console.log("updated :", updatedUserDetails);
    });
}
//updateUser('user1','new user 1', 'new user ln 100');
// to do functions
// to put todo in the DB
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        //find if user is there and then create todo : the user id should always be correct in this case
        // foreign key constrained
        const res = yield prisma.todo.create({
            data: {
                userId: userId,
                title: title,
                description: description
            }
        });
        console.log(res);
    });
}
//createTodo(3,"title1.012","des1.021");
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.findMany({
            where: {
                userId: userId,
            }
        });
        console.log(res);
    });
}
//getTodos(3);
function getTodosAndUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield prisma.todo.findMany({
            where: {
                userId: userId,
            },
            select: {
                user: true,
                title: true,
                description: true
            }
        });
        console.log(todos);
    });
}
getTodosAndUserDetails(1);
