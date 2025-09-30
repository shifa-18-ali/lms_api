"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const coursesModel_1 = __importDefault(require("../Model/coursesModel"));
router.get('/getCourse', async (request, response) => {
    try {
        const course = await coursesModel_1.default.find({});
        response.status(200).json(course);
    }
    catch (err) {
        response.status(500).json({ message: err.message });
        console.log(err);
    }
});
exports.default = router;
//# sourceMappingURL=coursesRoutes.js.map