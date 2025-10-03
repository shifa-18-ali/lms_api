"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const coursesRoutes_1 = __importDefault(require("./Routes/coursesRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb+srv://shifa_db_ali12:shifa_18ali@cluster0.hegt8xi.mongodb.net/lms')
    .then(() => console.log('db connected'));
app.use('', coursesRoutes_1.default);
app.listen(5000, () => {
    console.log(`server is running on port 5000`);
});
//# sourceMappingURL=index.js.map