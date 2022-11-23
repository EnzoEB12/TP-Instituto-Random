import { Router } from "express";
const router = Router();

// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
import {
    Login
  } from "../Controllers/login.controller.js";


router.post('/login-native', Login)

export default router;