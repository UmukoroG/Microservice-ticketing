import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties required to create a new User
interface UserAttrs {
    email: string;
    password: string;    
}

// An interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs):UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    updatedAt: string;//created by mongoose
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    }
},{
    toJSON: { //this is to change the response that is sent back to the user
        transform(doc, ret) {//ret is the object that is going to be turned into JSON
            //doc is the document that is being turned into JSON
            ret.id = ret._id;
            delete ret._id;
            delete ret.password; //this is to remove the password from the response
            delete ret.__v;//this is to remove the version key from the response
        }
    }
})

userSchema.pre('save', async function(done) {
    //this is a reference to the document that is being saved
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done(); //this is to tell mongoose that we are done with the pre save function
})

userSchema.statics.build = (attrs: UserAttrs) => {
    //This is a custom build function that will help us to type check the properties of the user
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);



export { User };