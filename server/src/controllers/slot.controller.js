import Slot from '../models/slot.model.js';

// Get all slots
export const getSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.status(200).json(slots);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add a new slot
export const addSlot = async (req, res) => {
  try {
    const newSlot = new Slot(req.body);
    await newSlot.save();
    res.status(200).json(newSlot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateSlot = async (req, res) => {
  const allowedOptions = ['student', 'notes', 'satisfaction'];
  const selectedOption = Object.keys(req.body);
  const doesExists = selectedOption.every((option) =>    allowedOptions.includes(option));
  if (!doesExists) {
    return res.status(404).json({ error: 'Update not possible.' });
  }
  try {
    const slot = await Slot.findById({ _id: req.params.id });
    selectedOption.forEach((option) => slot[option] = req.body[option]);
    await slot.save()
    res.status(200).json(slot);
    } catch (error) {
    res.status(404).json({ error: 'Update not possible.' }); 
    }
 }

export const deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findOneAndDelete({ _id: req.params.id });
    res.status(200).json('Slot was deleted');
  } catch (error) {
    res.status(404).json({ error: 'Delete failed.' });
  }
}

