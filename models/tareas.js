const Tarea = require('./tarea');

class Tareas {

    _listado = {};


    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }



    constructor() {

        this._listado = {};
    }


    // Metodo para crear tareas
    crearTarea(des = '') {

        const tarea = new Tarea(des);
        this._listado[tarea.id] = tarea;

    }

    // Metodo para borrar tareas

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }




    // Metodo para cargar tareas
    cargarTareasFromArray(tareas = []) {
        //buscamos el valor y lo guardamos en variable
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        })
    }

    // Metodo para listado completo
    listadoCompleto() {
        console.log('\n');
        // forEach al listado
        this.listadoArr.forEach((tarea, i) => {
            // suma 1 a los indices del array para quitar el 0
            const idx = `${i + 1}`.green;
            //Destructuring de los parametros del array de tarea
            const { desc, completadoEn } = tarea;
            // ternario de if
            const estado = (completadoEn)
                ? 'Completado'.green
                : 'Pendiente'.red

            //imprimimos con los datos recolectados
            console.log(`${idx} ${desc} ${estado}`);
        });
    }


    // Metodo para listar pendientes y completadas
    listarPendientesCompletadas(completadas = true) {
        // forEach al listado
        this.listadoArr.forEach((tarea, i) => {
            // suma 1 a los indices del array para quitar el 0
            let contador = 0;
            //Destructuring de los parametros del array de tarea
            const { desc, completadoEn } = tarea;
            // ternario de if
            const estado = (completadoEn)
                ? 'Completado'.green
                : 'Pendiente'.red

            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }

            }

        });
    }


    toggleCompletadas(ids = []) {

        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });


        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }


        });



    }



}

module.exports = Tareas;