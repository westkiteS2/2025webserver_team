import mongoose, { Schema, models, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    supabaseId: { type: String },

    otp: { type: String, default: null },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const User = models.User || model('User', UserSchema)
