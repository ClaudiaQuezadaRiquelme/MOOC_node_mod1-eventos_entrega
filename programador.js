const { EventEmitter } = require("./termostato");

const EventEmitter = require('events');
const later = require('later');

class Programador extends EventEmitter {
	
	constructor(configHorasTemp) {
        super();
        this.configHorasTemp = configHorasTemp;

        // Usar zona horaria local:
        later.date.localTime();
	}

	iniciarProgramador(configHorasTemp) {
        configHorasTemp.forEach(hrsTemp => {
            // Crear planificación para todos los dias a las horas ingresadas
            const sched = later.parse.text(`at ${hrsTemp.hora}`);
            // Crear un temporizador que se dispare en las horas ingresadas
            later.setInterval(() => console.log(`cambiar temperatura ideal a ${hrsTemp.temperatura}`), sched);
        });
    }
}

exports = module.exports = Programador;