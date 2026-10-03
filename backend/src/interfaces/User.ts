interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  role: "secretary" | "head";
}

export default IUser;
