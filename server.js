var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public/dist/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

var flash = require('express-flash');
app.use(flash());

var path = require('path');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dojoproduct_db');
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'product must have a title'],
        minlength: [3, 'product title must be more than 3 characters']
    },
    price: {
        type: Number,
        required: [true, 'product must have price'],
    },
    image: {
        type: String,
        required: [true, 'product must have image']
    }

}, { timestamps: true })
mongoose.model('Product', productSchema);
var Product = mongoose.model('Product');

app.get('/products', function (req, res) {
    console.log("See?");
    Product.find({}, function (err, result) {
        if (err) {
            console.log("error while loading page: ", err)
            res.json(err)
        } else {
            console.log("HERE ARE THE PRODUCTS: ", result)
            res.json(result)
        }
    })
})


app.post('/products', function (req, res) {
    Product.create({ title: req.body.title, price: req.body.price, image: req.body.image }, function (err, result) {
        if (err) {
            console.log("Error while creating: ", err);
             //if err comes back, create status obj, pass into res.json
            var status = {
                status: false,
                payload: err
            }
            console.log("Successfully created product", status);
            //if err comes back, create status obj, pass into res.json
            res.json(status);
        } else {
        //if result comes back, create status obj, pass into res.json
            var status = {
                status: true,
                payload: result
            }
            console.log("Successfully created product", status);
            //res.json goes to data.service
            res.json(status);
        }
    })
})

app.get('/products/:id', function (req, res) {
    Product.findOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            console.log("Error while getting one product: ", err)
            res.json(err)
        } else {
            console.log("Successfully obtained one product: ", result);
            res.json(result)
        }
    })
})

app.delete('/products/:id', function (req, res) {
    Product.findOneAndRemove({ _id: req.params.id }, function (result) {
        console.log("Successfully deleted");
        res.json(result);
    })
})
var opts = { runValidators: true }

app.put('/products/update/:id', function (req, res) {
    console.log(req.body.title)
    Product.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title, price: req.body.price, image: req.body.image }, opts, function (err, result) {
        if (err) {
            console.log("error while updating: ", err);
            //if err comes back, create status obj, pass into res.json
            var status = {
                status: false,
                payload: err
            }
            //res.json goes to data.service
            res.json(status)
        } else {
            //if result comes back, create status obj, pass into res.json
            var status = {
                status: true,
                payload: result
            }
            //res.json goes to data.service
            res.json(status)
        }
    })
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
})

app.listen(8000, function () {
    console.log("Listening on 8thou")
})