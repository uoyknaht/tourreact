import { EventEmitter } from 'events';

let CHANGE_EVENT = 'change';

export default class AppEventEmitter extends EventEmitter { 

    emitChange() {
        this.emit(CHANGE_EVENT);
    }    

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}