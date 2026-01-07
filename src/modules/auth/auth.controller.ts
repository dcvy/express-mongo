import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../users/user.collection";
export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ message: "Vui lòng cung cấp tên đăng nhập" });
      }

      let user = await User.findOne({ name });

      if (!user) {
        user = await User.create({ name });
      }

      const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        success: true,
        message: "Đăng nhập thành công!",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
