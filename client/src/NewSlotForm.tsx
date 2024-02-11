import { useRef } from 'react';
import './NewSlotForm.scss';
import { createSlot } from './api_logic';

export const NewSlotForm = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);

    const onSubmit = (e) => {
        const datetime = new Date(`${dateRef.current.value}T${timeRef.current.value}`);
        createSlot({ coach: nameRef.current.value, startDatetime: datetime })
            .then(() => alert('Slot created'))
            .catch((e) => alert(`ERROR: ${e.message}`));
        e.preventDefault();
    };

    return (
        <div>
            <div className='new-slot-form'>
                <h4 className='center'>New Availability Slot</h4>
                <small className='center'>
                    All slots are two hours long.
                </small>
                <div className='form-group'>
                    <label htmlFor='name'>Coach Name</label>
                    <input ref={nameRef} id='name' type='text' className="form-input" />
                </div>
                <div className='form-group'>
                    <label htmlFor='date'>Start Date</label>
                    <input ref={dateRef} id='date' type='date' className="form-input" />
                </div>
                <div className='form-group'>
                    <label htmlFor='time'>Start Time</label>
                    <input ref={timeRef} id='time' type='time' className="form-input" />
                </div>
                <button onClick={(e) => onSubmit(e)} className='btn btn-primary center'>Add Slot</button>
            </div>
        </div>
    );
}