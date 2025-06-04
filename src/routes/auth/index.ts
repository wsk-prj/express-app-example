import bcrypt from "bcrypt";
import { Router } from "express";
import { db } from "@/libs/db";
import { requireAuth } from "@/middleware/auth";

declare module 'express-session' {
  interface Session {
    userId: number;
  }
}

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { nickname, email, password } = req.body;
  if (!nickname || !email || !password) return res.status(400).json({ message: "Invalid request" });

  const user = await db.user.create({
    data: {
      nickname,
      email,
      password: await bcrypt.hash(password, 10),
    },
  });

  res.json({ message: "Register successful", user });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Invalid request" });

  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: "Unauthorized" });

  req.session.userId = user.id;

  res.json({ 
    message: "Login successful", 
    user: { 
      id: user.id, 
      nickname: user.nickname,
      email: user.email 
    } 
  });
});

authRouter.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.clearCookie('connect.sid'); // Default session cookie name
    res.json({ message: "Logout successful" });
  });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await db.user.findUnique({
    where: { id: req.session.userId },
    select: {
      id: true,
      nickname: true,
      email: true
    }
  });
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
});
