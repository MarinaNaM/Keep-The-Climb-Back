import mongoose from 'mongoose';

export interface iRelationFieldVote {
    type: mongoose.Types.ObjectId;
    ref: string;
    score: number;
}
