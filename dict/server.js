const express = require("express");

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

app.post('/search', (req, res)=>{
    const word = req.body.word;

    var sql = require("mssql");

    var config = {
        user: 'sa',
        password: 'mypassword',
        server: 'localhost',
        database: 'SchoolDB',
        options: { trustServerCertificate: true }
    };

    sql.connect(config, function (err) {
        if (err) console.log(err);

        var request = new sql.Request();

        request.query('select * from entries where word = "word"', function (err, recordset){
            if (err) console.log(err)
            
            res.render('Definitions', { definitions: recordset.recordsets[0] });
            
        });
        
    });
    
    

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