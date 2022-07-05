import { Schema, Types } from 'mongoose';
import { iRelationFieldVote } from '../../interfaces/relation-field-vote';

export interface iRoute {
    _id?: Types.ObjectId;
    name: string;
    img: string;
    length: number;
    grade: string;
    voteGrade: [
        {
            user: iRelationFieldVote;
            vote: string;
        },
    ];
}

export const routeSchema = new Schema({
    name: String,
    img: String,
    lenght: Number,
    grade: String,
    voteGrade: [
        {
            type: Types.ObjectId,
            ref: 'User',
            vote: {
                type: Number,
            },
        },
    ],
});
