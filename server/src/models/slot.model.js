import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const slotSchema = new Schema(
  {
    coach: { type: String, required: true },
    student: String,
    notes: String,
    satisfaction: Number,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;