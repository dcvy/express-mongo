import { Application } from "express";
import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.routes";

export default (app: Application): void => {
  authRoutes(app);
  userRoutes(app);
};
