'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./modelos/product');
const app = express();
const PORT = process.env.PORT || 3001;



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/api/product',(req,res)=>{
  res.send(200,{prodcuts:[]});
});

app.get('/api/product/:productId',(req,res)=>{
    let idProducto = req.params.productId;
    Product.findById(idProducto,(err,producto)=>{
        if(err){
            res.status(500).send({menssage:"Error al realizar la peticion"});
        }
        if(!producto){
            res.status(404).send({menssage:"El producto no existe"});
        }
        res.status(200).send(producto);
    });
});

app.post('/api/product',(req,res)=>{
    console.log("Api product");
    console.log(req.body);
    let product = new Product();

    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;
    product.save((err,productStore) =>{
        if(err){
            res.status(500).send({menssage:`Error al salvar el producto ${err}`});
        }else{
            res.status(200).send({product:productStore});
        }
    });
});

app.put('/api/product/:productId',(req,res)=>{

});

app.delete('/api/product/:productId',(requ,res)=>{

});


mongoose.connect("mongodb://localhost:27017/shop",(err,res) => {
    if(err)
        throw err
    else{
        app.listen(PORT,()=>{
          console.log(`API REST corriendo en http://localhost:${PORT}`);
        });
    }
});
