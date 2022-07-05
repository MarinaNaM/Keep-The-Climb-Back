import { Schema, SchemaTypes, Types } from 'mongoose';
import { iRelationField } from '../../interfaces/relation-field';

export interface iUser {
    _id?: Types.ObjectId;
    name: string;
    psw: string;
    img?: string;
    email: string;
    adress: {
        community?: string;
        province?: string;
    };
    routes: Array<iRelationField>;
}

export const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: [true, 'Este nombre ya existe'],
    },
    psw: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minLength: [
            8,
            'La longitud de la contraseña debe ser superior a 8 dígitos',
        ],
    },
    img: {
        type: String,
        default:
            'https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg',
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: [true, 'Este email ya está registrado'],
    },
    adress: {
        community: String,
        province: String,
    },
    routes: [{ type: SchemaTypes.ObjectId, ref: 'Route' }],
});
