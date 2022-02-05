const express = require("express");
const path = require("path");
// const q = require("./data/questions")

const q = [
    {
        question : [3, 1, 4, 1, 5],
        answer : 9
    },
    {
        question : [1, 1, 2, 3, 5],
        answer : 8
    },
    {
        question : [1, 4, 9, 16, 25],
        answer : 36
    },
    {
        question : [2, 3, 5, 7, 11],
        answer : 13
    },
    {
        question : [1, 2, 4, 8, 16],
        answer : 32
    },
]

var result = 0;
var index = 0;

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set view engine
app.set("view engine","pug");

app.get('/', (req, res) =>{
    res.render('index', {
        q : q[index],
        score : result
    });
    //res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/answer', (req, res)=>{
    const answer = parseInt(req.body.answer);
    if(answer === q[index].answer){
        result++;
    }
    index++;
    if(index < q.length -1)
     res.redirect('/');
    else
     res.redirect('result');
});

app.get('/result', (req, res)=>{
    res.render('result', {
        score : result
    });
});

app.listen(8080, () => {
    console.log(q);
    console.log("Running on 8080 port");
});