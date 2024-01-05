import {Publisher, Subjects, TicketUpdatedEvent} from '@umukorog-tickets/common'; 

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}
