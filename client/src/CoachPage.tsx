import { NewSlotForm } from "./NewSlotForm";
import { CoachSchedule } from "./CoachSchedule";

export const CoachPage = () => {
	return (
		<>
			<h2>Coach Area</h2>
			<div>
				<NewSlotForm />
				<CoachSchedule />
			</div>
		</>
	);
};
