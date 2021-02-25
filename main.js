const Habitacion = require('./habitacion');
const Climatizador = require('./climatizador');
const Termostato = require('./termostato');
const Programador = require('./programador');

// Creamos una habitacion:
const dormitorio = new Habitacion();
dormitorio.temperatura = 22;

// Creamos un climatizador para la habitacion:
const climatizador = new Climatizador(dormitorio);

// Creamos un Termostato que mira la temperatura de la habitacion:
const termostato = new Termostato(dormitorio);

// Definimos la programación
const programacion = [
    { hora: "07:00",
      temperatura: 22
    },
    { hora: "08:30",
      temperatura: 18
    },
    { hora: "18:00",
      temperatura: 22
    },
    { hora: "23:00",
      temperatura: 20
    }
]

// Creamos un Programador para cambiar la temperatura ideal según horario:
const programador = new Programador(programacion);

// Configuramos el termostato para controlar la temperatura:
termostato.on('muchofrio', () => climatizador.calentar());
termostato.on('muchocalor', () => climatizador.enfriar());

// Mostrar la temperatura periodicamente:
termostato.on('tic', (temp) => console.log(`${temp.toFixed(1)}ºC`));

// Configurar la temp ideal a los grados que corresponde según hora actual:
termostato.indicarTemperaturaIdeal(programador.setTemperaturaIdeal());

// Cambiar la temperatura ideal según indicaciones dentro de programador
programador.on('ideal', (temp) => termostato.indicarTemperaturaIdeal(temp));

// Inicializar Programador
programador.iniciarProgramador();

// Encender el termostato:
termostato.encender();
