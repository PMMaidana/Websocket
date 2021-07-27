const faker = require('faker');


class testProductos {
    constructor ()
    {
        this.productos = []
    }

    buildTable(data) {
        var table = document.getElementById('miTabla')
        console.log(table + 'asd')
        for (var i = 0; i < data.length; i++){
            var row = `<tr>
                            <td>${data[i].title}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].thumbnail}</td>
                    </tr>`
                table.innerHTML += row
        }
    }

    mockGenerator(num) {
    for(let i=0; i<num; i++) {
    let testprod = { title: faker.commerce.productName(), price: faker.commerce.price(), thumbnail: faker.image.food() };
    this.productos.push(testprod);
        }
    return console.log(`generados ${num} productos`)
    
    }

    listar() {
        return this.productos;
    }
}



module.exports = new testProductos;