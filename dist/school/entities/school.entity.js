"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SchoolSchema = new mongoose_1.Schema({
    name: String,
    img: String,
    period: String,
    localization: {
        lat: Number,
        lng: Number,
    },
    sectors: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Section' },
});
//# sourceMappingURL=school.entity.js.map