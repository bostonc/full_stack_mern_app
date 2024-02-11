import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const slotSchema = new Schema(
  {
    coach: { type: String, required: true },
    student: String,
    notes: String,
    satisfaction: Number,
    startDatetime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;