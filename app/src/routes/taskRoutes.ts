// routes/taskRoutes.ts
import express from "express";
import Task from "../models/Task";
import protectRoute from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, description, dificult, image } = req.body;

   if (!image || typeof image !== "string") {
  return res.status(400).json({ message: "Imagen inválida" });
}
    const score = parseInt(dificult, 10)*5

    const task = await Task.create({
      title,
      description,
      dificult,
      image,
      user: req.user!._id,
      completed: false,
      score
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

router.get("/user", protectRoute, async (req, res) => {
  try {
    const completed = req.query.completed === "true";

    const filter: any = { user: req.user!._id };

    if (req.query.completed !== undefined) {
      filter.completed = completed;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.log("Error al obtener las tareas del usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});


router.delete("/:id", protectRoute, async(req, res) =>{
  try{
    const task = await Task.findById(req.params.id);
    if(!task){
      return res.status(404).json({message: "Tarea no encontrada"});
    }
    if(task.user.toString() !== req.user?._id.toString()){
      return res.status(401).json({message: "No autorizado"});
    }
    await task.deleteOne();
    res.status(200).json({message: "Tarea eliminada"});
  }
  catch(error){
    console.log("Error al eliminar la tarea");
    res.status(500).json({message: "Error del servidor"});
  }
})

router.patch("/:id/complete", protectRoute, async(req, res) =>{
  try{
    const task = await Task.findById(req.params.id);
    if(!task){
      return res.status(404).json({message: "Tarea no encontrada"});
    }
    if(task.user.toString() !== req.user?._id.toString()){
      return res.status(401).json({message: "No autorizado"});
    }

    task.completed = !task.completed;
    await task.save();
    res.status(200).json({message: "Tarea actualizada"});
  }
  catch(error){
    console.log("Error al actualizar la tarea");
    res.status(500).json({message: "Error del servidor"});
  }
})

export default router;
