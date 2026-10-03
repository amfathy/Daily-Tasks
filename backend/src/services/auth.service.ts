import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jsonStorage from "../storage/jsonStorage";
import IUser from "../interfaces/User";

const USERS_FILE = "users.json";

class AuthService {
  async login(username: string, password: string) {
    try {
      const users = jsonStorage.read<IUser>(USERS_FILE);
      const user = users.find((u) => u.username === username);

      if (!user) {
        return { success: false, status: 401, message: "اسم المستخدم أو كلمة المرور غلط", data: null };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, status: 401, message: "اسم المستخدم أو كلمة المرور غلط", data: null };
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "12h" }
      );

      return {
        success: true,
        status: 200,
        message: "تم تسجيل الدخول بنجاح",
        data: { token, role: user.role, name: user.name },
      };
    } catch (error) {
      return { success: false, status: 500, message: "خطأ أثناء تسجيل الدخول", data: null };
    }
  }
}

export default new AuthService();
