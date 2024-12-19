const fs = require("fs")
const express = require('express');
const app = express();
app.use(express.json());

const path = require('path');
let dpPath = path.join(__dirname, "./data.json")
let todoPath = path.join(__dirname, "./todo.json")

const morgan = require('morgan');
app.use(morgan('dev'))


const fileData = JSON.parse(fs.readFileSync(dpPath));
const todoData = JSON.parse(fs.readFileSync(todoPath));

app.post('/register', (req, res) => {
    const {userName, password, firstName} = req.body;
    
    if(!userName || !password || !firstName){
        let response = {message: "All fields (userName, password, firstName) are required."}
        res.status(422).end(JSON.stringify(response))
    }

    const user = {userName, password, firstName}
    fileData.push(user);
    fs.writeFile(dpPath, JSON.stringify(fileData), err => {
        res.status(200).json({ message: "user was registered successfully" });
    });

}) 

app.post('/login', (req, res) => {
    const {userName, password} = req.body;
    let ok = false;
    for(let i = 0; i < fileData.length; i++){
        if(fileData[i].userName == userName){
            if(fileData[i].password == password){
                ok = true;
                break;
            }
        }
    }
    if(ok){
        res.status(200).json({message : "Logged in successfully"});
    }else{
        res.status(401).json({message : "invalid credentials"});
    }
})

app.get('/todos', (req, res) => {
    res.status(200).send(todoData);
})

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if(id > todoData.length){
        res.status(404).json({message : "The task you need to access doesn't Found!"});
    }
    res.status(200).json(todoData[id-1]);
})

app.post('/todos', (req, res) => {
    let Status = false;

    const {title, status} = req.body;
    if(status)
        Status = status;

    const todo = {title, Status};
    todoData.push(todo);

    fs.writeFile(todoPath, JSON.stringify(todoData), err => {
        res.status(200).json({message : "Todo created successfully!"});
    });
})

app.patch('/todos/:id', (req, res) =>{
    let id = req.params.id;
    if(id > todoData.length){
        res.status(404).json({message : "The task you need to access doesn't Found!"});
    }

    todoData[id-1].status = true;
    res.status(200).json({message: "Your task is done!"});
})

app.listen(3000, (req, res) => {
    console.log('The sever is running on port 3000');
})