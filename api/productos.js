const options = require('../config/mariaDB')
const knex = require ('knex')(options);

class Productos{
    constructor(){
        this.productos = [];
    }

    crearTabla(){
        knex.schema.createTable('productos', table => {
            table.increments('id')
            table.string('producto')
            table.integer('precio')
            table.string('url')
        })
    }

    listar(){        
        return this.productos;
    }

    listarPorId(id){
        let producto = this.productos.find(e => e.id === id);
        if(producto==undefined){
            producto = 'Producto no encontrado';
        }
        return producto;
    }

    guardar(producto){
        const largo = this.productos.length;
        this.productos.push({...producto,id:largo+1});
        knex.from('productos').insert(this.productos)
        .then(() => console.log('producto agregado'))
        .catch((err) => {console.log(err); throw err })
        .finally(() => {
            knex.destroy();
        })
        return this.productos[largo];
    }
       
    borrar(id){
        try {
            const producto = this.productos.find(item => item.id == id);
            this.productos = this.productos.filter(a => a.id != id);
            return producto;
        } catch (error) {
            return [{
                error: error
            }];
        }
    }

    actualizar(id, producto){
        try {
            const indice = this.productos.findIndex(item => item.id == id);
            this.productos[indice].title = producto.title;
            this.productos[indice].price = producto.price;
            this.productos[indice].thumbnail = producto.thumbnail;
            return this.productos[indice];
        } catch (error) {
            return [{
                error: error
            }];
        }
    }
}

module.exports = new Productos();