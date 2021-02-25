// https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/

class EventEmitter {
    listeners = {};  // key-value pair
    
    addListener(eventName, fn) {}
    on(eventName, fn) {}
    
    removeListener(eventName, fn) {}
    off(eventName, fn) {}
    
    once(eventName, fn) {}
    
    emit(eventName, ...args) { }
    
    listenerCount(eventName) {}
    
    rawListeners(eventName) {}
  }

  exports = module.exports = EventEmitter;