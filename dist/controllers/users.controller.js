"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsers)();
        res.json(users); // ✅ No need to return
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID format" }); // ✅ No need to return
            return;
        }
        const user = yield (0, user_service_1.getUserById)(id);
        if (!user) {
            res.status(404).json({ message: "User not found" }); // ✅ No need to return
            return;
        }
        res.json(user); // ✅ No need to return
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getUser = getUser;
