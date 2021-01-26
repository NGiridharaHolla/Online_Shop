const port = 3000;
var express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var connection = require('./models/connection');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'yomamasofat',
    resave: true,
    saveUninitialized: true
}));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/register', function(req, res) {
    res.render('Register');
});
app.get('/login', function(req, res) {
    res.render('Login', { isAdded: '' });
});
app.post('/', function(req, res) {
    var info = {
        "name": req.body.Name,
        "phone_number": req.body.phno,
        "email": req.body.Email
    };
    connection.query('INSERT INTO NEWSLETTER SET ?', info, function(err, results, fields) {
        if (err) {
            res.send({
                "code": 100,
                'failed': 'Data entry error'
            });
        } else {
            res.render('index');
        }
    });
});
app.post('/about', function(req, res) {
    var info = {
        "name": req.body.Name,
        "phone_number": req.body.phno,
        "email": req.body.Email
    };
    connection.query('INSERT INTO NEWSLETTER SET ?', info, function(err, results, fields) {
        if (err) {
            console.log(err)
            res.send({
                "code": 100,
                'failed': 'Data entry error'
            });
        } else {
            res.render('about');
        }
    });
});

app.post('/register', async function(req, res) {
    const salt = bcrypt.genSaltSync(saltRounds);
    var password = bcrypt.hashSync(req.body.password, salt);
    var users = {
        "Password": password,
        "first_name": req.body.first,
        "last_name": req.body.last,
        "Street": req.body.street,
        "Phone_number": req.body.phone
    };
    connection.query('INSERT INTO CUSTOMER SET ?', users, function(error, results, fields) {
        if (error) {
            console.log(error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            req.session.loggedin = true;
            req.session.phone = users.Phone_number;
            res.redirect('products')
        }
    });
});

app.post('/login', function(req, res) {
    var phone = req.body.phone;
    var password = req.body.password;
    connection.query('SELECT * FROM CUSTOMER WHERE Phone_number = ?', [phone, password], async function(error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                if (bcrypt.compareSync(password, results[0].Password)) {
                    req.session.loggedin = true;
                    req.session.phone = phone;
                    res.redirect('products')
                } else {
                    res.render('Login', { isAdded: true });
                }
            } else {
                res.render('Register', { isAddedphno: true });
            }
        }
    });
});
app.get('/products', function(req, res) {
    if (req.session.loggedin) {
        var first = req.session.first;
    }
    connection.query('CALL all_inventory', function(err, results, fields) {
        if (err) {
            res.send({
                code: "301",
                failed: "Data fetch error"

            });
        } else {
            results.pop();
            var inventory = []
            var i;
            for (i = 0; i < 10; i++) {
                inventory.push({
                    "product_key": results[0][i].Product_key,
                    "product_name": results[0][i].Product_name,
                    "quantity": results[0][i].Quantity,
                    "price": results[0][i].Price
                })
            }
            res.render('product', { inventory: inventory });
        }
    })
});
app.get('/product', function(req, res) {
    var date = new Date();
    var product_id = req.query.productid;
    if (req.session.loggedin) {
        var phone = req.session.phone;
        connection.query('SELECT * FROM CUSTOMER WHERE Phone_number = ?', phone, function(err, results, fields) {
            if (err) {
                res.send({
                    'code': 202,
                    "failure": 'Data fetch Error'
                });
            } else {
                var cid = results[0].customer_id;
                var order = {
                    'customer_name': results[0].First_name + results[0].Last_name,
                    'to_street': results[0].Street,
                    'to_city': "Bengaluru",
                    'timestamp': date,
                    'zip_code': "560098",
                    'customer_id': cid,
                    'product_id': product_id,
                    'ship_id': Math.floor(Math.random() * 5) + 1
                };
                connection.query('INSERT INTO ORDERS SET ?', order, function(err, results, fields) {
                    if (err) {
                        console.log(err);
                        res.send({
                            'code': 400,
                            'failure': 'order insert unsucessfull'
                        });
                    } else {
                        res.redirect('shipping')
                    }
                });
            }
        });
    }
});
app.get('/order', function(req, res) {
    var cid;
    var orders = [];
    if (req.session.loggedin) {
        var first = req.session.first;
        connection.query('SELECT * FROM CUSTOMER WHERE First_name = ?', first, function(err, results, fields) {
            if (err) {
                res.send({
                    'code': 700,
                    'failure': "Data fetch error"
                });
            } else {
                cid = results[0].customer_id;
                connection.query('SELECT * FROM ORDERS WHERE customer_id = ?', cid, function(err, results, fields) {
                    if (err) {
                        res.send({
                            'code': 701,
                            'failure': "Data fetch error"
                        })
                    } else {
                        res.send({
                            'code': 702,
                            'Sucess': "Data fetch Sucess"
                        })
                        let i;
                        for (i = 0; i < results.length; i++) {
                            orders.push({
                                'order_id': results[i].Order_id,
                                'timestamp': results[i].timestamp
                            })
                        }
                    }
                })
            }

        })

    }

});

app.get('/product/shipping', function(req, res) {
    var shippers = [];
    connection.query('SELECT * FROM SHIPPING', function(err, results, fields) {
        if (err) {
            console.log(err);
            res.send({
                'code': 600,
                'Failure': 'Data Fetch Error'
            });
        } else {
            let i;
            for (i = 0; i < 5; i++) {
                shippers.push({
                    "shipper": results[i].shippers_name
                });
            }
            res.render('shipping', { shippers: shippers })
        }
    });
});

app.get('/sucess', function(req, res) {
    res.render('sucess');
});

app.post('/contact', function(req, res) {
    var feedback = {
        'name': req.body.name,
        'email': req.body.email,
        'feedback': req.body.message
    };
    connection.query('INSERT INTO FEEDBACK SET ?', feedback, function(results, fileds, errror) {
        if (errror) {
            res.send({
                'code': 900,
                'Failure': "Data entry unsucessfull"
            });
        } else {
            res.render('contact');
        }
    })
})

app.use('*', function(req, res) {
    res.status(404).render('404Err');
});

app.listen(port, function(err) {
    if (err) {
        console.log("O Oh, Internal Server Error");
        return;
    }
    return console.log("Server is up and running on port: ", port);
})