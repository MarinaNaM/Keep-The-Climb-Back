import { Schema, Types } from 'mongoose';

export interface iRoute {
    _id?: Types.ObjectId;
    name: string;
    length: number;
    grade: string;
    voteGrade: [
        {
            user: string;
            vote: number;
        },
    ];
}

export const routeSchema = new Schema({
    name: String,
    length: Number,
    grade: String,
    voteGrade: [
        {
            user: { type: Types.ObjectId },
            vote: Number,
        },
    ],
});
