const EventEmitter = require("./termostato");
const later = require('later');

// Clase Programador.
// Cambia la temperatura ideal según lo definido en una programación entregada dentro de un arreglo.
// Metodos:
//    iniciarProgramador: encargado de emitir el evento 'ideal´ en los horarios definidos en la programación. 
//    setTemperaturaIdeal: mira la hora actual y retorna la temperatura ideal según corresponde
// Eventos:
//    ideal: entrega la temperatura ideal en número entero 
class Programador extends EventEmitter {
	
	constructor(programacion) {
        super();
        this.programacion = programacion;
        
        // Usar zona horaria local:
        later.date.localTime();
	}

	iniciarProgramador() {
        this.programacion.forEach(hrsTemp => {
            // Crear planificación para todos los dias a las horas ingresadas
            const sched = later.parse.text(`at ${hrsTemp.hora}`);

            // Crear un temporizador que se dispare en las horas ingresadas
            later.setInterval(() => 
                this.emit('ideal', hrsTemp.temperatura), 
                sched);
        });
    }

    // mira la hora actual y retorna la temperatura ideal según corresponde
    setTemperaturaIdeal() {
        const date = new Date();
        const isoFormat = date.toISOString();
        const actualHHmmss = isoFormat.slice(11,-5); // HH:mm:ss
        let idealTemp = 0;
        for (let i = 0; i < this.programacion.length; i++) {
            const configHHmmss = `${this.programacion[i].hora}:00`;
            if ((i === 0) && (actualHHmmss < configHHmmss)) {
                idealTemp = this.programacion[i].temperatura;
            } else {
                if (actualHHmmss > configHHmmss) {
                    idealTemp = this.programacion[i].temperatura;
                }
            }
        }
        // console.log(`Temperatura ideal seteada por programador ${idealTemp}`);
        return idealTemp;        
    }
}

exports = module.exports = Programador;