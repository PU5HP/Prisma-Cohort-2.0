import { PrismaClient } from "@prisma/client";
import { log } from "node:console";
import { todo } from "node:test";
const prisma = new PrismaClient();


//user create
async function insertUser(username:string, password:string, firstName:string, lastName:string, email:string) {
    const response = await prisma.user.create({
        data:{
            username,
            password,
            firstName,
            lastName,
            email
        }
    })
    console.log(response);
}

//insertUser('user4','user4','user4','user4','user4');

/*Todo create*/

async function insertTodo( title:string, description:string, done:boolean, userId:number) {
    const response = await prisma.todo.create({
        data:{
            title,
            description,
            done,
            userId
        }
    })
    console.log('todo-inserted:',response);
}
//insertTodo('user4.1-title','user-4.1-des',false,4);

//a function that let’s you fetch the details of a user given their username @unique

async function getUser(username:string){
    const response = await prisma.user.findFirst({
        where:{
            username:username
        }
    })
    const userTodo = await prisma.todo.findMany({
        where:{
            userId:response?.id
        }
    })
    console.log("user details:", response);
    console.log("user todos:",userTodo);
}

//getUser('user4')

// update the first and last name of the user

async function updateUser(username:string, firstName:string, lastName:string){
    //find if username exists in DB
    const response = await prisma.user.findFirst({
        where:{
            username:username
        }
    })
    if(response===null){
        console.log('Not updated : wrong username');
        return;
    }
    const updatedUserDetails = await prisma.user.update({
        where:{username:response.username},
        data:{
            firstName,
            lastName
        }
    })
    console.log('old details:',response);
    console.log("updated :",updatedUserDetails);
}

//updateUser('user1','new user 1', 'new user ln 100');

// to do functions

// to put todo in the DB

async function createTodo(userId:number,title:string, description:string) {
    //find if user is there and then create todo : the user id should always be correct in this case
    // foreign key constrained
    const res = await prisma.todo.create({
        data:{
            userId:userId,
            title: title,
            description:description
        }
    })
    console.log(res);
}
//createTodo(3,"title1.012","des1.021");

async function getTodos(userId:number) {
    const res = await prisma.todo.findMany({
        where:{
            userId: userId,
        }
})
console.log(res);
}

//getTodos(3);

async function getTodosAndUserDetails(userId: number) {
    const todos = await prisma.todo.findMany({
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
}

getTodosAndUserDetails(1);