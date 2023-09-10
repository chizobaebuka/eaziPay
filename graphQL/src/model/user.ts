import { Schema, model, Document } from 'mongoose';

interface User {
    id: string;
    name: String;
    email: String;
    age: Number;
    gender: String;
    password: String;
}

export type UserDocument = User & Document;

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = model<UserDocument>('User', userSchema);

export default User;
