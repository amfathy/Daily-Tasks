import bcrypt from "bcryptjs";
import crypto from "crypto";
import jsonStorage from "./storage/jsonStorage";
import IUser from "./interfaces/User";

const users: IUser[] = [
  {
    id: crypto.randomUUID(),
    name: "مكتب السكرتارية",
    username: "secretary",
    password: bcrypt.hashSync("1234", 10),
    role: "secretary",
  },
  {
    id: crypto.randomUUID(),
    name: "مكتب الرئيس",
    username: "head",
    password: bcrypt.hashSync("1234", 10),
    role: "head",
  },
];

jsonStorage.write("users.json", users);
console.log("تم إنشاء المستخدمين (كلمة المرور 1234 - غيّرها)");
