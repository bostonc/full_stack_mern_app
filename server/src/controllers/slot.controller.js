import Slot from '../models/slot.model.js';

// Get all slots
export const getSlots = async (req, res) => {
  console.log('Route:', req.route);
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
    console.log('Route:', req.route, 'Body:', req.body);
    await newSlot.save();
    res.status(200).json(newSlot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateSlot = async (req, res) => {
  console.log('Route:', req.route, 'Body:', req.body);
  const allowedOptions = ['student', 'notes', 'satisfaction'];
  const selectedOption = Object.keys(req.body);
  const doesExists = selectedOption.length > 0 && selectedOption.every((option) => {
    return allowedOptions.includes(option) 
      && req.body[option] !== '';
  });
  if (!doesExists) {
    return res.status(404).json({ error: 'Invalid options submitted.' });
  }
  try {
    const slot = await Slot.findById({ _id: req.query.id });
    selectedOption.forEach((option) => slot[option] = req.body[option]);
    await slot.save()
    res.status(200).json(slot);
    } catch (err) {
    res.status(404).json({ error: err.message }); 
    }
 }

export const deleteSlot = async (req, res) => {
  console.log('Route:', req.route);
  try {
    const slot = await Slot.findOneAndDelete({ _id: req.query.id });
    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }
    res.status(200).json(`Slot deleted: ${slot}`);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

