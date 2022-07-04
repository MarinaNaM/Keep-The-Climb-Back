import { Types } from 'mongoose';
export interface iRelationField {
    type: Types.ObjectId;
    ref: string;
}
