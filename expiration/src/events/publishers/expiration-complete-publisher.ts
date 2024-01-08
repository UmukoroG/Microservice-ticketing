import { Subjects, Publisher, expirationCompleteEvent }  from "@umukorog-tickets/common";

export class expirationCompletePublisher extends Publisher<expirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}