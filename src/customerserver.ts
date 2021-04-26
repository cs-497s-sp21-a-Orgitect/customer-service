import express from 'express'
import sqlite3 from 'sqlite3'
import bodyParser from 'body-parser'
import path from 'path';

const app = express();
const port = 3000;


var db = new sqlite3.Database(':memory:');
db.serialize(function () {
    db.run("CREATE TABLE customers (uid INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT UNIQUE, phone TEXT, customer_number TEXT, street_address TEXT, zip TEXT, state TEXT, processID INTEGER)")
    /* 
        uid Int aka customer ID
        name text
        email text
        phone text
        customernum text
        street_add text
        zipcode text
        state text
        processID Int
    */
}); 

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname));


// list out all the customers and their info
app.get('/api/all/',(req,res) =>{
    db.all("SELECT rowid AS id, name FROM customers", function(err,rows){
        res.json(rows)
    })

});
//xd
app.get('/api/notification/',(req,res) =>{
    db.serialize(function () {
        let sql = "SELECT Name name,Email email FROM customers where uid = ?"
        let id = req.body.id
        db.get(sql,[id],(err,row) =>{
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            res.json(row)
        })
    })
})

app.get('/api/:name',(req,res) =>{
    db.serialize(function ()  {
        db.get("SELECT * FROM customers where Name = (\"" + req.params.name + "\")", function(err,row){
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            res.json(row)
        })
    })
});
app.post('/api/:name', (req,res)=>{
    //console.log('post')
    //console.log(req.body)
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }
    var sql= "INSERT INTO customers (Name,Email,phone) VALUES (?,?,?)"
    var params =[data.name, data.email, data.phone]
    db.serialize(function () {
        
        db.run(sql,params, function (err: { message: any; }, result: any) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "customer added!",
                "data": data,
            })
        })
    })
})

app.post('/api/', (req,res)=>{
    //console.log('post')
    //console.log(req.body)
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }
    var sql= "INSERT INTO customers (Name,Email,phone) VALUES (?,?,?)"
    var params =[data.name, data.email, data.phone]
    db.serialize(function () {
        
        db.run(sql,params, function (err: { message: any; }, result: any) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "customer added!",
                "data": data,
            })
        })
    })
})
app.put('/api/:name', (req,res)=>{
    console.log('put')
    db.serialize(function () {
        db.run("UPDATE customers SET processID = (\""+ req.body.processID + "\")"+ " WHERE Name = (\"" + req.params.name + "\")", function (err: { message: any; }, result: any) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "customer stage for " +req.params.name+ " updated!",
                "data": req.body,
            })
        })
    })
})
//
app.delete('/api/', (req,res)=>{
    db.serialize( function(){
        let sql = "DELETE FROM customers WHERE Name = ?"
        let name = req.body.name
        db.run(sql,[name],(err: {message: any},result:any)=>{

            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "customer " +req.body.name+" deleted!",
                "data": req.body.name,
            })
        })
    })
})

app.delete('/api/:name', (req,res)=>{
    console.log('delete')
    db.serialize( function () {
        db.run("DELETE FROM customers WHERE Name =(\"" + req.params.name + "\")", function (err: { message: any; }, result: any) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "customer " +req.params.name+" deleted!",
                "data": req.params.name,
            })
        })

    })
})
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname+ '/index.html'))
});

app.listen(port, () =>{
   return console.log('listening on port 3000')
});
