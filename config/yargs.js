const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Estado completado de tarea por hacer',
    type: 'boolean'
}

const argv = require('yargs')
            .command('crear', 'Crear una tarea por hacer', {descripcion})
            .command('actualizar', 'Actualizar estado de una tarea por hacer', {
                descripcion,
                completado
            })
            .command('borrar', 'Eliminar una tarea por hacer', {descripcion})
            .command('buscar', 'Buscar una tarea', {completado})
            .help()
            .argv;

module.exports = {
    argv
}