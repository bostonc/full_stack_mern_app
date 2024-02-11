import { useState } from 'react';
import './StudentScheduler.scss';
import { getFreeSlots, updateSlot, type Slot } from './api_logic';

export const StudentScheduler = () => {
    const [name, setName] = useState<string | undefined>();
    const [slots, setSlots] = useState<Slot[]>([]);

    const onNameChange = (e) => {
        setName(e.target.value);
    }


    const onGetFreeSlots = async (e) => {
        const results = await getFreeSlots();
        if (!results) {
            alert('No free slots found');
            return;
        }
        setSlots(results);
        e.preventDefault();
    };

    return (
        <div className='retrieval-form'>
            <h4 className='center'>Available Slots</h4>
            <small className='center'>
                All slots are two hours long.
            </small>
            <div className='center'>
                <div className='form-group'>
                    <label htmlFor='name'>Your Name</label>
                    <input onChange={onNameChange} id='name' type='text' />
                </div>
                <button onClick={(e) => onGetFreeSlots(e)} className='btn btn-primary'>Find Free Slots</button>
            </div>
            <FreeSlotsTable slots={slots} name={name} />
        </div>
    );
}

const FreeSlotsTable = ({slots, name}: {slots: Slot[], name: string}) => {
    return ( slots?.length > 0 && 
        <>
            <small className='center'>
                To schedule an appointment, enter your name and press Schedule.
                <br/>All slots are two hours long.
            </small>
            <table>
                <thead>
                    <tr>
                        <th>Coach</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {slots.map((slot) => {
                        return <TableRow key={slot._id} slot={slot} name={name} />;
                    })}
                </tbody>
            </table>
        </>
    );
}

const TableRow = ({slot, name}: {slot: Slot, name: string}) => {
    return (
        <tr key={slot._id}>
            <td>{slot.coach}</td>
            <td>{slot.startDatetime}</td>
            <td>
                <button onClick={() => { 
                    updateSlot(slot._id, { student: name })
                    .then(() => alert('Slot scheduled!'))
                    .catch((e) => alert(`ERROR: ${e.message}. Did you forget to include your name?`));            
                }}>Schedule</button>
            </td>
        </tr>
    );
};