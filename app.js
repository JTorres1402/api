const express = require('express');

const mysql = require('mysql');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

//mysql
const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b3d9c190977ee1',
    password: 'f84a1942',
    database: 'heroku_c75a05bec47f62a'
});


//CORS policy
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


//Routes
app.get('/', (req, res) => {
    res.send('welcome to my API');
});


//Petitions get
app.get('/pets', (req, res) => {
    const sql = 'SELECT * FROM pets';

    connection.query('SELECT * FROM pets', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/pets/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM pets WHERE idpets  = ?';

    connection.query(sql, [id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/shop', (req, res) => {
    const sql = 'SELECT * FROM products';

    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/shop/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE idproducts  = ?'

    connection.query(sql, [id], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});




/*

router.get('/shop/', (req, res) => {
    mysqlConnection.query('SELECT * FROM products', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        } 
    });
});

router.post('/', (req, res) => {
    const { id, name, age, description, photo } = req.body;
    const query = `
    CALL petsAddOrEdit(?, ?, ?, ?, ?)
    `;
    mysqlConnection.query(query, [idpets, name, description, age, photo], (err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Pet saved'});
        } else {
            console.log(err);
        } 
    });
});

router.put('/pets/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, description, photo } = req.body;
    const query = 'CALL petsAddOrEdit(?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [idpets, name, description, age, photo], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Pet updated'});
        } else {
            console.log(err);
        } 
    });
});

router.delete('/pets/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM pets WHERE idpets = ? ', [id], (err, rows , fields) =>{
        if(!err){
            res.json({Status: 'Pet deleted'});
        } else {
            console.log(err);
        } 
    });
});


/*

router.get('/shop/', (req, res) => {
    mysqlConnection.query('SELECT * FROM products', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        } 
    });
});

router.post('/', (req, res) => {
    const { id, name, age, description, photo } = req.body;
    const query = `
    CALL petsAddOrEdit(?, ?, ?, ?, ?)
    `;
    mysqlConnection.query(query, [id, name, description, age, photo], (err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Pet saved'});
        } else {
            console.log(err);
        } 
    });
});

router.put('/pets/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, description, photo } = req.body;
    const query = 'CALL petsAddOrEdit(?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [id, name, description, age, photo], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Pet updated'});
        } else {
            console.log(err);
        } 
    });
});

router.delete('/pets/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM pets WHERE id = ? ', [id], (err, rows , fields) =>{
        if(!err){
            res.json({Status: 'Pet deleted'});
        } else {
            console.log(err);
        } 
    });
});





*/

//check connect
connection.connect( error => {
    if (error);
    console.log('Database server running')
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
