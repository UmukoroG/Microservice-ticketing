import mongoose from "mongoose";
import { orderStatus } from "@umukorog-tickets/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";


interface OrderAttrs {
    id: string;
    // version: number;
    userId: string;
    price: number;
    status: orderStatus
}

interface OrderDoc extends mongoose.Document {
    // version: number;
    userId: string;
    price: number;
    status: orderStatus  
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;//takes in an object of type OrderAttrs and returns an object of type OrderDoc
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

// orderSchema.set("versionKey", "version");
// orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        // version: attrs.version,
        userId: attrs.userId,
        price: attrs.price,
        status: attrs.status
    });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };