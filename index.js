const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(methodOverride('_method'))

const Product = require('./models/product.js')

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("mongo connection open...")
})
.catch(err =>{   
    console.log("mongo error")
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

const catagories = ['fruit', 'vegetable', 'dairy', 'bread', 'mushroom'];
//index
app.get('/products', async (req,res)=>{
    const {catagory} = req.query;
    if(catagory){
        const products = await Product.find({catagory});
        res.render("products/index",{products, catagory});
    }else{
        const products = await Product.find({});
        res.render("products/index",{products, catagory:'All'});
    }
})
//new route
app.get('/products/new', (req, res)=>{
    res.render('products/new',{catagories})
})
//show route
app.get('/products/:id', async (req, res)=>{
    const {id} = req.params;
    const foundProduct = await Product.findById(id)
    res.render('products/show',{foundProduct})
})
//post route
app.post('/products', async (req, res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})
//edit route
app.get('/products/:id/edit', async (req, res)=>{
    const {id} = req.params;
    const foundProduct = await Product.findById(id)
    res.render('products/edit',{foundProduct,catagories})
})
//patch
app.put('/products/:id', async (req, res)=>{
    const {id} = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{runValidators:true, new:true});
    console.log(updatedProduct)
    res.redirect(`/products/${updatedProduct._id}`)
})
app.delete('/products/:id', async (req, res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})


app.listen(3000, ()=>{ 
    console.log('app is listening')
})