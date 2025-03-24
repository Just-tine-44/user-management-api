import { Request, Response, RequestHandler } from "express";
import { getAllUsers, getUserById } from "../services/user.service";

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users); //  No need to return
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID format" }); //  No need to return
      return;
    }

    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" }); //  No need to return
      return;
    }

    res.json(user); // No need to return
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
