import { Subjects, Publisher, PaymentCreatedEvent} from "@umukorog-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}