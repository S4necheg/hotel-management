import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';

import { ViewState } from '@devexpress/dx-react-scheduler';
import moment from 'moment';

// import {appointments} from './demo-data/appointments';

import AppContext from '../../context';

import {
  red, lightBlue 
} from '@mui/material/colors';

function ScheduleToDay() {

    let currentDate = moment();

    currentDate = currentDate.toISOString();

    const {arrival, departure, rows} = React.useContext(AppContext)

    // let arrival_time = arrival.startDate

    // arrival_time = arrival_time.substr(0, 10)

    // let departure_time = departure.endDate

    // departure_time = departure_time.substr(0, 10)
    
    const appointments = []

    for (let i = 0; i < arrival.length; i++) {
      if (currentDate.substr(0, 10) === (arrival[i].startDate).substr(0, 10)) {
        for (let k = 0; k < rows.length; k++) {
          if (arrival[i].registration === rows[k].id) {
            let startDate = arrival[i].startDate
            let title = rows[k].firstName + " " + rows[k].lastName
            let location = arrival[i].location
            appointments.push({startDate, title, location})
          }
        }
        // console.log('arrival', appointments)
      }
    }

    for (let j = 0; j < departure.length; j++) {
      if (currentDate.substr(0, 10) === (departure[j].endDate).substr(0,10)) {
        for (let h = 0; h < rows.length; h++) {
          if (departure[j].registration === rows[h].id) {
            let endDate = departure[j].endDate
            let title = rows[h].firstName + " " + rows[h].lastName
            let location = departure[j].location
            appointments.push({endDate, title, location})
          }
        }
      // console.log('departure', appointments)
      }
    }

    const colors = [
      {
        text: 'Заселение',
        id: 'blue',
        color: lightBlue,
      },
      {
        text: 'Выселение',
        id: 'red',
        color: red,
      },
    ];
    
    const resources = [
      {
        fieldName: 'location',
        title: 'Location',
        instances: colors,
      },
    ]

    console.log('appointments', appointments)

    const Appointment = ({
        children, style, ...restProps
      }) => (
        <Appointments.Appointment
          {...restProps}
          style={{
            ...style,
            // backgroundColor: '#e28090',
            borderRadius: '8px',
          }}
        >
          {children}
        </Appointments.Appointment>
      );

    return (
        <Paper>
            <Scheduler
            data={appointments}
            locale={'ru'}
            >
            <ViewState 
            currentDate={currentDate}
            />
            <DayView
                startDayHour={8}
                endDayHour={24}
            />
            <Appointments
                appointmentComponent={Appointment}
            />
            <AppointmentTooltip />

            <Resources
              data={resources}
              mainResourceName="location"
            />
            </Scheduler>
        </Paper>
    )
}

export default ScheduleToDay