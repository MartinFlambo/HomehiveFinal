import { Schema, model, Model, Types } from "mongoose";
import bcrypt from "bcryptjs";

// Interfaces de usuario y métodos
interface IUser {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  createdAt?: string;
}

interface IUserMethods {
  comparePassword(candidate: string): Promise<boolean>;
}

export type IUserDoc = IUser & IUserMethods & { _id: Types.ObjectId };

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6, select: false },
    profileImage: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.method(
  "comparePassword",
  async function (candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
  }
);

const User = model<IUser, UserModel>("User", userSchema);
export default User;
