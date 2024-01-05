import  {Message, Stan} from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], msg: Message): void;
    private client: Stan;
    protected ackWait = 5*1000; //5 seconds

    constructor(client: Stan){
        this.client = client;
    }

    subscriptionOptions(){
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable() //this is to make sure that the listener will receive all the events that have been emitted in the past while it was offline 
            .setManualAckMode(true) //listener will not automatically acknowledge the event that it has processed until we tell it to do so    
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName); //this is to make sure that the listener will not receive the same event twice.queueGroupName); //this is to make sure that the listener will not receive the same event twice
    }

    listen(){
        const subscription = this.client.subscribe(
            this.subject, 
            this.queueGroupName, 
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

            const parseData = this.parseMessage(msg);
            this.onMessage(parseData, msg);
        });
    }

    parseMessage(msg: Message){
        const data = msg.getData();
        return typeof data === 'string' 
            ? JSON.parse(data) 
            : JSON.parse(data.toString('utf8'));
    }

}
