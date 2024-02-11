import { useState } from 'react';
import './StudentScheduler.scss';
import { getSlotsForStudent, updateSlot, type Slot } from './api_logic';

export const StudentUpcoming = () => {
    const [name, setName] = useState<string | undefined>();
    const [slots, setSlots] = useState<Slot[]>([]);

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onGetStudentSlots = async (e) => {
        if (!name) {
            alert('Please enter your name first.');
            return;
        }
        const results = await getSlotsForStudent(name);
        if (!results) {
            alert('No upcoming appointments found.');
            return;
        }
        setSlots(results);
        e.preventDefault();
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onGetStudentSlots(e);
        }
    };

    return (
        <div className='retrieval-form'>
            <h4 className='center'>Upcoming Appointments</h4>
            <div className='center'>
                <div className='form-group'>
                    <label htmlFor='name'>Your Name</label>
                    <input onKeyPress={onKeyPress} onChange={onNameChange} id='name' type='text' />
                </div>
                <button onClick={(e) => onGetStudentSlots(e)} className='btn btn-primary'>Retrieve Upcoming Events</button>
            </div>
            <FreeSlotsTable slots={slots} name={name} />
        </div>
    );
}

const FreeSlotsTable = ({slots}: {slots: Slot[]}) => {
    return ( slots?.length > 0 && 
        <>
            <table>
                <thead>
                    <tr>
                        <th>Coach</th>
                        <th>Time</th>
                        <th>Student</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {slots.map((slot) => {
                        return <TableRow key={slot._id} slot={slot} />;
                    })}
                </tbody>
            </table>
        </>
    );
}

const TableRow = ({slot}: {slot: Slot}) => {
    return (
        <tr key={slot._id}>
            <td>{slot.coach}</td>
            <td>{slot.startDatetime}</td>
            <td>{slot.student}</td>
            <td>
                <button onClick={() => { 
                    updateSlot(slot._id, { student: null })
                    .then(() => alert('Slot cancelled!'))
                    .catch((e) => alert(`ERROR: ${e.message}`));            
                }}>Cancel</button>
            </td>
        </tr>
    );
};