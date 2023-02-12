import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: { type: String },
    password: { type: String },
    uID: { type: String },
})

let User = models.users || model('users', userSchema)
export default User