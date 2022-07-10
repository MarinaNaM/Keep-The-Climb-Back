import { Schema, SchemaTypes, Types } from 'mongoose';
import { iRelationField } from '../../interfaces/relation-field';

export interface iSector {
    _id?: Types.ObjectId;
    name: string;
    img: string;
    hoursSun: 'mañana' | 'tarde' | 'todo' | 'sombra';
    localization: {
        lat: number;
        lng: number;
    };
    routes: Array<iRelationField>;
}

export const sectorSchema = new Schema({
    name: String,
    img: String,
    hoursSun: { type: String, enum: ['mañana', 'tarde', 'todo', 'sombra'] },
    localization: {
        lat: Number,
        lng: Number,
    },
    routes: [{ type: SchemaTypes.ObjectId, ref: 'Route' }],
});
