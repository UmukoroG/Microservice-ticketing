import { Listener } from "./base-listener";
import  {Message} from 'node-nats-streaming';
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {//TicketCreatedEvent is the type of the data that the listener will receive   
    readonly subject = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message){
        console.log('Event data!', data);

        console.log(data.id)
        console.log(data.price)
        console.log(data.title)

        msg.ack();
    }
}

export { TicketCreatedListener };