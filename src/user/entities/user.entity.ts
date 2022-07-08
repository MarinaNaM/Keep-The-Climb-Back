/* istanbul ignore file */
import { Schema, SchemaTypes, Types } from 'mongoose';
import { isEmail } from '../../helpers/is.email';

export interface iUser {
    _id?: Types.ObjectId;
    name: string;
    psw: string;
    img?: string;
    email: string;
    address: {
        community?: string;
        province?: string;
    };
    role: 'admin' | 'user';
    routes: Array<{ route: string; isProject: boolean; isEnchain: boolean }>;
}

export const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: [true, 'This name already exists in database'],
    },
    psw: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password length must be longer than 8 digits '],
    },
    img: {
        type: String,
        default:
            'https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg',
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [isEmail, 'This email is not valid'],
        unique: [true, 'This email already exists'],
    },
    address: {
        community: String,
        province: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    routes: [
        {
            route: { type: SchemaTypes.ObjectId, ref: 'Route' },
            isProject: { type: Boolean, default: false },
            isEnchain: { type: Boolean, default: false },
        },
    ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.psw;
        delete returnedObject.role;
    },
});
