import { Application } from "express";
import { AuthController } from "./auth.controller";

export default (app: Application) => {
  app.post("/auth/login", AuthController.login);
};
