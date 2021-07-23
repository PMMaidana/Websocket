const faker = require('faker');
const fs = require('fs')

var str = []
class testProductos {
    constructor ()
    {
        this.productos = []
    }

    

    mockGenerator(num) {
    for(let i=0; i<1; i++) {
    let testprod = `${faker.commerce.productName()} ${faker.commerce.price ()} ${faker.image.food ()}`;
    this.productos.push(testprod);
    
        }
    return console.log(this.productos)
    }
}



module.exports = new testProductos;