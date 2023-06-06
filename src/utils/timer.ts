export class Timer {
    private timer?: number = undefined;
    private readonly interval: number;
    private readonly update: () => void;
        
    constructor(params: {update: () => void, interval?: number}) {
        this.update = params.update;
        this.interval = params.interval || 1000;
    }

    stop() {
        if (this.timer !== null) {
            window.clearInterval(this.timer);
        }
    }
    
    start() {
        this.stop();
        this.timer = window.setInterval(this.update, this.interval)
    }
}