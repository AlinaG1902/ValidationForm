import React, {useState, useRef, useEffect} from 'react';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

export default function DateInput({birthDay, setBirthDay, className, errors}) {
    const [datepickerInstance, setDatepickerInstance] = useState(null);
    const inputRef = useRef(null);
    
    useEffect(() => {
        const date = new Date();
        const datepicker = new AirDatepicker(inputRef.current, {
            onSelect: (formattedDate) => { 
                setBirthDay(formattedDate); 
            },
        });

        setDatepickerInstance(datepicker);

        return () => {
            datepicker.destroy();
        };
    }, []);

    const toggleCalendar = () => {
        if (datepickerInstance) {
            datepickerInstance.show();
        }
    };

    return (
        <div className={className}>
            <input
            placeholder="Дата рождения"
            name='birthDay'
            type='text'
            value={birthDay.formattedDate}
            ref={inputRef}
            onChange={setBirthDay}
        />
        <button type='button' onClick={toggleCalendar}></button>
        <div>{errors}</div>
        </div>
       
    );
};