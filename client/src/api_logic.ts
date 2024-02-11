import axios from "axios";
import { Period } from "./CoachSchedule";

interface Slot {
	_id: string,
	coach: string
	student?: string,
	notes?: string,
	satisfaction?: number,
	startDatetime: Date,
}

// TODO: move to a constants file, or maybe .env
const url = "http://localhost:3000/";

export const createSlot = async (slot: Slot) => {
	return axios.post(url, slot);
};

export const getFreeSlots = async () => {
	const results = await axios.get(url).catch((e) => alert(`ERROR: ${e.message}`));
	// TODO: this filtering should be done on the server during db query
	return results?.data?.filter((slot: Slot) => {
		const now = new Date().getTime();
		return (!slot.student || slot.student === '') && Date.parse(slot.startDatetime) > now;
	});
};

export const getSlotsForCoach = async (name: string, period: Period) => {
	const results = await axios.get(url).catch((e) => alert(`ERROR: ${e.message}`));
	// TODO: this filtering should be done on the server during db query
	return results?.data.filter((slot: Slot) => {
		const now = new Date().getTime();
		if (period === 'future') {
			return slot.coach === name && Date.parse(slot.startDatetime) > now;
		} else {
			return slot.coach === name && Date.parse(slot.startDatetime) < now;
		}
	});
};

export const getSlotsForStudent = async (name: string) => {
	const results = await axios.get(url).catch((e) => alert(`ERROR: ${e.message}`));
	// TODO: this filtering should be done on the server during db query
	return results?.data.filter((slot: Slot) => {
		const now = new Date().getTime();
		return slot.student === name && Date.parse(slot.startDatetime) > now;

	});
};

export const updateSlot = async (id: string, slot: Maybe<Slot>) => {
	return axios.patch(url, slot, { params: { id }});
};

export const deleteSlot = async (id: string) => {
	return axios.delete(url, { params: { id }} );
};