import { User } from "../models/User";

export class UserService {
  static async getAllUsers() {
    return await User.find();
  }

  static async getUserById(id: string) {
    return await User.findById(id);
  }

  static async createUser(data: any) {
    return await new User(data).save();
  }

  static async updateUser(id: string, data: any) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  }
}
