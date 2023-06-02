import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import {appointments} from './demo-data/appointments';


function ScheduleToDay() {

    return (
        <Paper>
            <Scheduler
            data={appointments}
            locale={'ru'}
            >
            <DayView
                startDayHour={8}
                endDayHour={24}
            />
            <Appointments />
            <AppointmentTooltip />
            </Scheduler>
        </Paper>
    )
}

export default ScheduleToDay