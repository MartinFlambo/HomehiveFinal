import express, { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

// Función para generar un token JWT
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }

  return jwt.sign({ userId }, secret, { expiresIn: "15d" });
};

//Ruta para registrar un usuario
router.post(
  "/register",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, username, password } = req.body;

      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "La contraseña debe tener al menos 6 caracteres" });
      }

      if (username.length < 3) {
        return res
          .status(400)
          .json({ message: "El usuario debe tener al menos 3 caracteres" });
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res
          .status(400)
          .json({ message: "El nombre de usuario ya existe" });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }

      const profileImage = `https://api.dicebear.com/5.x/initials/svg?seed=${username}`;

      const user = new User({ email, username, password, profileImage });
      await user.save();

      const token = generateToken(user._id.toString());

      return res.status(201).json({
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          profileInage: user.profileImage,
        },
      });
    } catch (error) {
      console.error("Error en registro:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
);

router.post("/login", async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Debes rellenar todos los campos" });
      }
  
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).json({ message: "Introduce las credenciales correctas" });
      }
  
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Introduce las credenciales correctas" });
      }
  
      const token = generateToken(user._id.toString());
  
      return res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  });

// Endpoint para ping (usado por el cron job para mantener activo el servidor)
router.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});


export default router;
