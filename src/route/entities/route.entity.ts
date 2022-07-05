import { Schema, Types } from 'mongoose';
import { iRelationFieldVote } from '../../interfaces/relation-field-vote';

export interface iRoute {
    _id?: Types.ObjectId;
    name: string;
    img: string;
    length: number;
    grade: number;
    voteGrade: [
        {
            user: iRelationFieldVote;
            vote: string;
        },
    ];
    isProject: boolean;
    isEnchain: boolean;
}

export const routeSchema = new Schema({
    name: String,
    img: String,
    lenght: Number,
    grade: Number,
    voteGrade: [
        {
            type: Types.ObjectId,
            ref: 'User',
            vote: {
                type: Number,
            },
        },
    ],
    isProyect: Boolean,
    isEnchain: Boolean,
});
