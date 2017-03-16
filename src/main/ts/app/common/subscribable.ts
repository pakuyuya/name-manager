/**
 *
 */
export class Subscribable {
    public subscribers;

    public subscribe(event:string, callback : (arg:any) => void) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    }

    public emmit(event:string, arg:any) {
        if (this.subscribers[event]) {
            for (let callback of this.subscribers[event]) {
                callback(event);
            }
        }
    }
}