// routes/taskRoutes.ts
import express from "express";
import Task from "../models/Task";
import protectRoute from "../middleware/auth.middleware";

const router = express.Router();

// Lista de imágenes válidas
const allowedImages = ["aspirar.jpg"];

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, description, dificult, image } = req.body;

    if (!allowedImages.includes(image)) {
      return res.status(400).json({ message: "Imagen no permitida" });
    }

    const task = await Task.create({
      title,
      description,
      dificult,
      image,
      user: req.user!._id,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Error al crear tarea:", err);
    res.status(500).json({ message: "Error al crear la tarea" });
  }
});

router.get("/", protectRoute, async (req, res) => {
  try {
    const page = Number(req.query.page as string) || 1;
    const limit = Number(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalTasks = await Task.countDocuments();

    res.send({tasks, currentPage: page, totalTasks: totalTasks, totalPages: Math.ceil(totalTasks/limit)});
  } catch (error) {
    console.log("Error al obtener las tareas:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export default router;
