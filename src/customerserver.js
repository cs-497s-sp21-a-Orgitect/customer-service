"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sqlite3_1 = __importDefault(require("sqlite3"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var port = 3000;
var db = new sqlite3_1.default.Database(':memory:');
db.serialize(function () {
    db.run("CREATE TABLE customers (uid INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT UNIQUE, phone TEXT, customer_number TEXT, street_address TEXT, zip TEXT, state TEXT, processID INTEGER)");
    /*
        uid Int aka customer ID
        Name text
        Email text
        phone text
        customernum text
        street_add text
        zipcode text
        state text
        processID Int
    */
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.static(__dirname));
/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
}); */
// list out all the customers and their info
app.get('/api/all/', function (req, res) {
    db.all("SELECT rowid AS id, name FROM customers", function (err, rows) {
        res.json(rows);
    });
});
//xd
app.get('/api/notification/:uid', function (req, res) {
    db.serialize(function () {
        var sql = "SELECT Name name,Email email FROM customers where uid = ?";
        var id = req.params.id;
        db.get(sql, [id], function (err, row) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(row);
        });
    });
});
app.get('/api/:name', function (req, res) {
    db.serialize(function () {
        db.get("SELECT * FROM customers where Name = (\"" + req.params.name + "\")", function (err, row) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(row);
        });
    });
});
app.post('/api/:name', function (req, res) {
    //console.log('post')
    //console.log(req.body)
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };
    var sql = "INSERT INTO customers (Name,Email,phone) VALUES (?,?,?)";
    var params = [data.name, data.email, data.phone];
    db.serialize(function () {
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "customer added!",
                "data": data,
            });
        });
    });
});
app.post('/api/', function (req, res) {
    //console.log('post')
    //console.log(req.body)
    var data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };
    var sql = "INSERT INTO customers (Name,Email,phone) VALUES (?,?,?)";
    var params = [data.name, data.email, data.phone];
    db.serialize(function () {
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "customer added!",
                "data": data,
            });
        });
    });
});
app.put('/api/:name', function (req, res) {
    console.log('put');
    // email,phone, street_add,zipcode, state
    var data = {
        email: req.body.email,
        phone: req.body.phone,
        streetadd: req.body.streetadd,
        zipcode: req.body.zipcode,
        state: req.body.state
    };
    var sql = "UPDATE customers SET Email = (?), phone = (?), street_add = (?), zipcode = (?), state= (?) WHERE Name = (?)";
    var params = [data.email, data.phone, data.streetadd, data.zipcode, data.state, req.params.name];
    db.serialize(function () {
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "customer changed!",
                "data": data,
            });
        });
    });
    /* db.serialize(function () {
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
    }) */
});
app.delete('/api/', function (req, res) {
    db.serialize(function () {
        var sql = "DELETE FROM customers WHERE Name = ?";
        var name = req.body.name;
        db.run(sql, [name], function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "customer " + req.body.name + " deleted!",
                "data": req.body.name,
            });
        });
    });
});
app.delete('/api/:name', function (req, res) {
    console.log('delete');
    db.serialize(function () {
        db.run("DELETE FROM customers WHERE Name =(\"" + req.params.name + "\")", function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "customer " + req.params.name + " deleted!",
                "data": req.params.name,
            });
        });
    });
});
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname + '/index.html'));
});
app.listen(port, function () {
    return console.log('listening on port 3000');
});
