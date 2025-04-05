import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const facultySchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },
        email: {
        type: String,
        required: true,
        unique: true,
        },
        phone: {
        type: String,
        required: true,
        },
        employeeId: {
        type: String,
        required: true,
        unique: true,
        },
        password: {
        type: String,
        required: true,
        select: false,
        },
    },
    { timestamps: true }
    );

facultySchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
}
);

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;