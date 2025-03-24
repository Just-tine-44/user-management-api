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
const express_1 = require("express");
const data_source_1 = require("../config/data-source");
const user_model_1 = require("../model/user.model");
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Received data:", req.body);
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const userRepository = data_source_1.AppDataSource.getRepository(user_model_1.User);
        const newUser = userRepository.create({ username, email, password });
        yield userRepository.save(newUser);
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userRepository = data_source_1.AppDataSource.getRepository(user_model_1.User);
        const user = yield userRepository.findOne({ where: { id: Number(id) } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield userRepository.remove(user);
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router; // ✅ Correctly export the router
