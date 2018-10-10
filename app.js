
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer')
const colors = require('colors');

const comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
    break;
    case 'listar':
        let listado = porHacer.getLista();
        console.log('====== Tareas ======'.green);
        for(let tarea of listado){
            console.log('Tarea: ', tarea.descripcion);
            console.log('Estado: ', tarea.completado)
            console.log('------------------------'.blue);
        }
    break;
    case 'actualizar':
        let actualizado = porHacer.putLista(argv.descripcion, argv.completado)
        console.log(actualizado);
    break;
    case 'borrar':
        let borrado = porHacer.deleteLista(argv.descripcion);
        console.log(borrado)
    break;
    case 'buscar':
        let resultado = porHacer.buscarEstadoTarea(argv.completado);
        
        if(argv.completado === true) {
            argv.completado = 'Completadas';
        } else if(argv.completado === false) {
            argv.completado = 'Por Hacer';
        }

        console.log(`====== Tareas ${argv.completado} ======`.green);
        for(let tarea of resultado){
            console.log(tarea.descripcion);
            console.log('------------------------'.blue);
        }
    break;
    default:
        console.log('comando no reconocido');

}
