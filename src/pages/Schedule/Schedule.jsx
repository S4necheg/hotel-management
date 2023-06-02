import React from 'react';
import './index.scss'

import ScheduleW from './ScheduleW';
import AppContext from '../../context';

function Schedule() {
    const {workSchedule, setWorkSchedule} = React.useContext(AppContext)

    return (
        <div className="schedule">
            <div className='inSchedule'>
                <ScheduleW 
                // workSchedule={workSchedule}
                // setWorkSchedule={setWorkSchedule}
                />
            </div>
        </div>
    )
}

export default Schedule;