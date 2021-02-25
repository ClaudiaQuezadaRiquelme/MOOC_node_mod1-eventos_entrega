// https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/

// Clase EventEmitter.
// Guarda claves de eventos con sus respectivos arreglos de funciones
// permite suscribirse a eventos, eliminar eventos, suscribirse a un evento por una sola vez y emitir eventos
// Metodos:
//    on
//    off
//    once
//    emit
class EventEmitter {
  
  constructor() {
    // for the same event we allow multiple listeners to be registered
    this.listeners = {} // key-value pair
  }
  

  // The on event checks if the event is already registered. 
  // If yes, returns the array, otherwise empty array
  on(eventName, callback) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(callback);
    return this;
  }

  // The off method takes an eventName and the callback as the parameters. 
  // It removes said listener from the event array.
  off(eventName, callback) {
    let arrCallb = this.listeners[eventName];

    if (!arrCallb) return this;

    for (let i = arrCallb.length; i > 0; i--) {
      if (arrCallb[i] === callback) { // if we find the listener,
        arrCallb.splice(i,1); // we remove the listener
        break;
      }
    }
    return this;
  }

  // If the event occurs, their callback is executed and removed from the event array
  once(eventName, callback) {
    this.listeners = this.listeners[eventName] || [];
    const onceEvent = () => {
      callback();
      this.off(eventName, onceEvent);
    }
    this.listeners[eventName].push(onceEvent);
  }

  // Emit method calls each of the listeners registered for the event named eventName
  // and pass the arguments to their callbacks
  emit(eventName, ...args) {
    let arrCallb = this.listeners[eventName];
    
    if (!arrCallb) return false;
    
    // For all function listeners, invoke the function with the arguments
    arrCallb.forEach( callback => { callback(...args); });
    return true;
  }

}

exports = module.exports = EventEmitter;
