import mongoose from "mongoose";
import {Schema} from "mongoose"

const timeOffSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    requestType: {
        type: String,
        enum: ["Sick", "Personal", "Vacation"],
        required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now},
});

const TimeOff = mongoose.model("Time Off", timeOffSchema);
export default TimeOff;