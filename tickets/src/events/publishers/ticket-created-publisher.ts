import {Publisher, Subjects, TicketCreatedEvent} from '@umukorog-tickets/common'; 

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}

