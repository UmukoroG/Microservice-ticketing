import {Publisher, Subjects, orderCancelledEvent} from '@umukorog-tickets/common';

export class OrderCancelledPublisher extends Publisher<orderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}