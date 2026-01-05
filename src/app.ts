import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middlewares/auth.middleware";

import { requestLogger } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { User } from "./models/User";

dotenv.config();
const app = express();

app.use(helmet());
app.use(requestLogger);
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Đã kết nối MongoDB"))
  .catch((err) => console.error("Lỗi kết nối:", err));

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

app.post("/login", (req, res) => {
  const { name } = req.body;

  const token = jwt.sign({ name }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Đăng nhập thành công!", token });
});

app.get("/users", verifyToken, async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.post(
  "/users",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, age } = req.body;

      if (!name || !email) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin name hoặc email" });
      }

      const newUser = new User({ name, email, age });
      await newUser.save();

      res.status(201).json({
        success: true,
        data: newUser,
      });
    } catch (error: any) {
      next({ status: 400, message: "Không thể tạo user", error });
    }
  }
);

app.put(
  "/users/:id",
  verifyToken,
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, email, age } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, age },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy người dùng để sửa" });
      }

      res.json({
        success: true,
        message: "Cập nhật thành công",
        data: updatedUser,
      });
    } catch (error: any) {
      next({ status: 400, message: "Lỗi khi cập nhật user", error });
    }
  }
);

app.delete(
  "/users/:id",
  verifyToken,
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy người dùng để xóa" });
      }

      res.json({
        success: true,
        message: `Đã xóa thành công người dùng: ${deletedUser.name}`,
      });
    } catch (error: any) {
      next({ status: 400, message: "Lỗi khi xóa user", error });
    }
  }
);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
