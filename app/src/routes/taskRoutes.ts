// routes/taskRoutes.ts
import express from "express";
import Task from "../models/Task";
import protectRoute from "../middleware/auth.middleware";

const router = express.Router();

// Lista de imágenes válidas
const allowedImages = [
  "aspirar.jpg",
];

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

export default router;
