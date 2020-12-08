const mongoose = require('mongoose');
const Product = require('./models/product.js')

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("mongo connection open...")
})
.catch(err =>{   
    console.log("mongo err")
})

// const p = new Product({
//     name: 'goat cheese',
//     price: 9.00,
//     catagory: 'dairy'
// })

// p.save()
//     .then(data=>console.log(data))
//     .catch(err=>console.log(err))
