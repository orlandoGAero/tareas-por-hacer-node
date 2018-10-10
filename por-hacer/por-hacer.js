
const fs = require('fs');

let listadoTareas = [];

const cargarDB = () => {
    try {
        listadoTareas = require('../db/data.json');
    } catch (error) {
        listadoTareas = [];
    }
}

const guardarDB = () => {
    return new Promise((resolve,reject) => {

        let data = JSON.stringify(listadoTareas);
    
        fs.writeFile('db/data.json', data , err => {
            if(err)
                reject(err);
            else
                resolve('data.json');
        })
    })    
}

const crear = descripcion => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoTareas.push( porHacer );

    guardarDB()
        .then(archivo => console.log(`Guardado en el archivo: ${archivo}`.green))
        .catch(error => console.log(error))

    return porHacer;
}

const getLista = () => {
    cargarDB();
    return listadoTareas
}

const buscarEstadoTarea = (completado) => {
    cargarDB();

    completado = Boolean(completado);
    const lista = listadoTareas.filter(tarea => tarea.completado === completado);
        
    return lista;
}

const putLista = (descripcion, completado) => {
    cargarDB();

    const index = listadoTareas.findIndex(tarea => tarea.descripcion === descripcion);

    if(index >= 0 ) {
        listadoTareas[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false; 
    }
}

const deleteLista = (descripcion) => {
    cargarDB();

    const nuevaLista = listadoTareas.filter(tarea => tarea.descripcion !== descripcion);
    if(listadoTareas.length === nuevaLista.length) {
        return false;
    } else {
        listadoTareas = nuevaLista;
        guardarDB();    
        return true;
    }

}

module.exports = {
    crear,
    getLista,
    putLista,
    deleteLista,
    buscarEstadoTarea
}