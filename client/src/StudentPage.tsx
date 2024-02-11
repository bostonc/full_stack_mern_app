import { StudentScheduler } from './StudentScheduler';
import { StudentUpcoming } from './StudentUpcoming';

export const StudentPage = () => {
	return (
		<>
			<h2>Student Area</h2>
			<StudentScheduler />
			<StudentUpcoming />
		</>
	);
};
