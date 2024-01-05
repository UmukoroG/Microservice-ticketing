import {Publisher, Subjects, orderCreatedEvent} from '@umukorog-tickets/common';

export class OrderCreatedPublisher extends Publisher<orderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

