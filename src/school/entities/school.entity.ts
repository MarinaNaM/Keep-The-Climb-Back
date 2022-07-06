/* istanbul ignore file */

import { Schema, SchemaTypes, Types } from 'mongoose';
import { iRelationField } from '../../interfaces/relation-field';

export interface iSchool {
    _id?: Types.ObjectId;
    name: string;
    img: string;
    period: string;
    localization: {
        lat: number;
        lng: number;
    };
    sectors: Array<iRelationField>;
}

export const schoolSchema = new Schema({
    name: String,
    img: String,
    period: String,
    localization: {
        lat: Number,
        lng: Number,
    },
    sectors: [{ type: SchemaTypes.ObjectId, ref: 'Sector' }],
});
