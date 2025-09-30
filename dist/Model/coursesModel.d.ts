import mongoose from "mongoose";
declare const CourseModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    studentIds: any[];
    resources: mongoose.Types.DocumentArray<{
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }> & {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }>;
    id?: string | null;
    title?: string | null;
    description?: string | null;
    teacherId?: string | null;
    thumbnail?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    studentIds: any[];
    resources: mongoose.Types.DocumentArray<{
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }> & {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }>;
    id?: string | null;
    title?: string | null;
    description?: string | null;
    teacherId?: string | null;
    thumbnail?: string | null;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    studentIds: any[];
    resources: mongoose.Types.DocumentArray<{
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }> & {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }>;
    id?: string | null;
    title?: string | null;
    description?: string | null;
    teacherId?: string | null;
    thumbnail?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    studentIds: any[];
    resources: mongoose.Types.DocumentArray<{
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }> & {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }>;
    id?: string | null;
    title?: string | null;
    description?: string | null;
    teacherId?: string | null;
    thumbnail?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    studentIds: any[];
    resources: mongoose.Types.DocumentArray<{
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }> & {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }>;
    id?: string | null;
    title?: string | null;
    description?: string | null;
    teacherId?: string | null;
    thumbnail?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    studentIds: any[];
    resources: mongoose.Types.DocumentArray<{
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }> & {
        id: string;
        type: "video" | "pdf" | "ppt" | "doc" | "other";
        title: string;
        url: string;
        createdAt: NativeDate;
        transcript: string;
    }>;
    id?: string | null;
    title?: string | null;
    description?: string | null;
    teacherId?: string | null;
    thumbnail?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default CourseModel;
//# sourceMappingURL=coursesModel.d.ts.map