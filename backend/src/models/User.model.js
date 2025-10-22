import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpiry: Date,
    refreshToken: String,
    accessToken: String,
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})
//method for checking the password
userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
}

export const User = new model("user", userSchema);
