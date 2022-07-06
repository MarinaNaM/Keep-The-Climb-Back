/* istanbul ignore file */

import { Schema, SchemaTypes, Types } from 'mongoose';
import { iRelationField } from '../../interfaces/relation-field';

export interface iSector {
    _id?: Types.ObjectId;
    name: string;
    img: string;
    hoursSun: string;
    localization: {
        lat: number;
        lng: number;
    };
    routes: Array<iRelationField>;
}

export const sectorSchema = new Schema({
    name: String,
    img: String,
    hoursSun: String,
    localization: {
        lat: Number,
        lng: Number,
    },
    routes: [{ type: SchemaTypes.ObjectId, ref: 'Route' }],
});
