"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseSchema = new mongoose_1.default.Schema({
    id: { type: String, require },
    title: { type: String, require },
    description: { type: String, require },
    teacherId: { type: String, require },
    studentIds: [],
    thumbnail: { type: String, require },
    resources: [
        {
            id: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true
            },
            type: {
                type: String,
                enum: ["video", "pdf", "ppt", "doc", "other"],
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            transcript: {
                type: String,
                default: null,
            },
        },
    ],
}, {
    timestamps: true
});
const CourseModel = mongoose_1.default.model('Course', CourseSchema);
exports.default = CourseModel;
//# sourceMappingURL=coursesModel.js.map