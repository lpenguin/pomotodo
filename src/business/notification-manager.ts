export class NotificationManager {
    private readonly closeTimeout: number;

    constructor(options: {closeTimeout: number}) {
        this.closeTimeout = options.closeTimeout;
    }

    public requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            return Promise.resolve(false);
        }

        if (Notification.permission === 'granted') {
            return Promise.resolve(true);
        }

        if (Notification.permission === 'denied') {
            return Promise.resolve(false);
        }

        return Notification.requestPermission().then((permission) => {
            return permission === 'granted';
        });
    }

    public show(title: string, text: string): Promise<void> {
        return this.requestPermission().then((granted) => {
            if(granted) {
                const n = new Notification(title, {body: text});
                setTimeout(() => n.close(),  this.closeTimeout);
            }
        });
    }
}