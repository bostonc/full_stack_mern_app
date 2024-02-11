import { useRef, useState } from 'react';
import './CoachSchedule.scss';
import { getSlotsForCoach, deleteSlot, updateSlot, type Slot } from './api_logic';

type Period = 'past' | 'future';

export const CoachSchedule = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const [period, setPeriod] = useState<Period>('future');
    const [slots, setSlots] = useState<Slot[]>([]);

    const onSubmit = async (e) => {
        const results = await getSlotsForCoach(nameRef.current.value, period);
        setSlots(results);
        e.preventDefault();
    };

    return (
        <div className='retrieval-form'>
            <h4 className='center'>Retrieve Your Events</h4>
            <div className='center'>
                <div className='form-group'>
                    <label htmlFor='name'>Your Name</label>
                    <input ref={nameRef} id='name' type='text' />
                </div>
                <PeriodDropdown onSelect={setPeriod} period={period} />
                <button onClick={(e) => onSubmit(e)} className='btn btn-primary'>Get My Schedule</button>
            </div>
            <ResultsTable slots={slots} />
        </div>
    );
}

const PeriodDropdown = ({onSelect, period}: {onSelect: (period: Period) => void, period: Period}) => {
	return (
		<div className="dropdown">
			<button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
				{period === 'future' ? 'Future' : 'Past'}
			</button>
			<ul className="dropdown-menu">
				<li className="dropdown-item" value="future" onClick={() => onSelect('future')}>Future</li>
				<li className="dropdown-item" value="past" onClick={() => onSelect('past')}>Past</li>
			</ul>
		</div>
	);
}

const ResultsTable = ({slots}: {slots: Slot[]}) => {
    return ( slots?.length > 0 && 
        <>
            <small className='center'>
                To submit edits, press Enter after typing in the Notes or Satisfaction fields.
            </small>
            <table>
                <thead>
                    <tr>
                        <th>Coach</th>
                        <th>Time</th>
                        <th>Student</th>
                        <th>Notes</th>
                        <th>Satisfaction</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {slots.map((slot) => {
                        return <TableRow slot={slot} key={slot._id} />;
                    })}
                </tbody>
            </table>
        </>
    );
}

const TableRow = ({slot}: {slot: Slot}) => {
    const notesRef = useRef<HTMLInputElement>(null);
    const satisfactionRef = useRef<HTMLInputElement>(null);
    const submitEdits = () => {
        const notes = notesRef.current.value;
        const satisfaction = satisfactionRef.current.value;
        updateSlot(slot._id, { notes, satisfaction })
            .then(() => alert('Slot updated!'))
            .catch((e) => alert(`ERROR: ${e.message}`));
    }
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitEdits();
        }
    };
    return (
        <tr key={slot._id}>
            <td>{slot.coach}</td>
            <td>{slot.startDatetime}</td>
            <td>{slot.student}</td>
            <td>
                <input ref={notesRef} onKeyPress={onKeyPress} defaultValue={slot.notes} type='text'/>
            </td>
            <td>
                <input ref={satisfactionRef} onKeyPress={onKeyPress} defaultValue={slot.satisfaction} type='text'/>
            </td>
            <td>
                <button onClick={() => deleteSlot(slot._id)}>Cancel</button>
            </td>
        </tr>
    );
};