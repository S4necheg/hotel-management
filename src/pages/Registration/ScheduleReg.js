import * as React from 'react';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';

import './scheduleW.scss'

import { FormControlLabel, Checkbox } from '@mui/material';

// import { appointments } from '../Home/demo-data/appointments';

import AppContext from '../../context';
import NET from '../../network';
import axios from 'axios';

let currentDate = moment();

export default () => {
  const {checkIn, setCheckIn} = React.useContext(AppContext)
  const [data, setData] = React.useState(checkIn);
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);

  const {
    allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
  } = editingOptions;

  const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      const newAdded = { id: startingAddedId, ...added }
      setData([...data, newAdded]);
      setCheckIn([...data, newAdded])
      // console.log({ id: startingAddedId, ...added })
      //запрос на добавление
      let newArrival = {registration: startingAddedId, startDate: newAdded.startDate, location: 'blue'}
      let newDeparture = {registration: startingAddedId, endDate: newAdded.endDate, location: 'red'}
      axios.post(`${NET.APP_URL}/registrations`, newAdded);
      axios.post(`${NET.APP_URL}/arrival_to_days`, newArrival)
      axios.post(`${NET.APP_URL}/departure_to_days`, newDeparture)
    }
    if (changed) {
      //id измененного объекта
      let changedId = ''
      let objChanged = ''
      console.log("changed", changed)
      const searchChange = data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment))
      console.log("seachChange",searchChange)
      console.log("data", data)

      for (let i = 0; i < searchChange.length; i++){
        let result = JSON.stringify(searchChange[i]) === JSON.stringify(data[i])
        if (result === false) {
          changedId = searchChange[i].id
          // console.log('changedId', changedId)
          objChanged = searchChange[i]
          // console.log('objChanged', objChanged)
        }
        console.log(result)
      }
      setData(searchChange);
      setCheckIn(searchChange);
      //запрос на обновление
      console.log('changedId', changedId)
      console.log('objChanged', objChanged)
      axios.put(`${NET.APP_URL}/registrations/${changedId}`, objChanged)
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
      setCheckIn(data.filter(appointment => appointment.id !== deleted))
      //Запрос на удаление
      axios.delete(`${NET.APP_URL}/registrations/${deleted}`)
    }
    setIsAppointmentBeingCreated(false);
  }, [setData, setIsAppointmentBeingCreated, data]);
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });

  const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
    <MonthView.TimeTableCell
      {...restProps}
      onDoubleClick={allowAdding ? onDoubleClick : undefined}
    />
  )), [allowAdding]);
  
  //Настройка AppointmentForm
  const CommandButton = React.useCallback(({ id, ...restProps }) => {
    if (id === 'deleteButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, [allowDeleting]);

  // const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  //   //return <div />;
  //   return (
  //     <AppointmentForm.BasicLayout
  //     appointmentData={appointmentData}
  //     onFieldChange={onFieldChange}
  //     {...restProps}   
  //   >
  //   </AppointmentForm.BasicLayout>
  //   )
  // };

  const BoolEditor = (props) => {
    return null;
  };

  const LabelComponent = (props) => {
    if (props.text === 'Details') {
      return <AppointmentForm.Label
      { ...props} 
      text="Регистрация гостя"
      />  
    } else if (props.text === 'More Information') {
      return <><AppointmentForm.Label
      { ...props}
      text="Информация о заселении"
      />
      {/* <AppointmentForm.TextEditor
      { ...props}
      type='numberEditor'
      placeholder='Цена'
      /> */}
      </>
    } else if (props.text === '-') {
      return <AppointmentForm.Label
      { ...props}
      />  
    }
  };

  const InputComponent = (props) => {
    if (props.type === 'titleTextEditor') {
      // <AppointmentForm.TextEditor
      // { ...props}
      // type='textEditor'
      // placeholder='ФИО'
      // />
     return <input className='titleInput' type='text' placeholder='ФИО'/>
    }

    // return <>
    // <AppointmentForm.Select
    // { ...props}
    // availableOptions={[]}
    // />
    // <AppointmentForm.TextEditor
    // { ...props}
    // type='numberEditor'
    // placeholder='Цена'
    // />
    // <AppointmentForm.BooleanEditor
    // { ...props}
    // label="Оплачено?"
    // />
    // </>
    return <>
      <input className='roomInput' type='number' placeholder='Номер комнаты' />
      <input className='priceInput' type='number' placeholder='Цена' />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Оплачено?" />
    </>
  };

  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating],
  );
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating],
  );

  return (
    <React.Fragment>
      <Paper>
        <Scheduler
          data={data}
          locale={'ru'}
          height={700}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            defaultCurrentViewName="Месяц"
          />
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />

          <IntegratedEditing />

          <WeekView
            startDayHour={8}
            endDayHour={24}
            name="Неделя"
            displayName="Неделя"
            
          />

          <MonthView
            startDayHour={8}
            endDayHour={24}
            name="Месяц"
            displayName="Месяц"
            timeTableCellComponent={TimeTableCell}
          />

          <Toolbar />

          <DateNavigator />

          <TodayButton 
            messages={{today: 'Сегодня'}}
          />

          <ViewSwitcher />

          <Appointments />

          <AppointmentTooltip
            showOpenButton
            showDeleteButton={allowDeleting}
          />
          <AppointmentForm
            messages={{commitCommand: 'Сохранить',
            titleLabel: 'ФИО',
            notesLabel: 'Номер, цена, статус оплаты'}}
            // basicLayoutComponent={BasicLayout}
            // textEditorComponent={InputComponent}
            booleanEditorComponent={BoolEditor}
            labelComponent={LabelComponent}

            commandButtonComponent={CommandButton}
            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
          />
          <DragDropProvider
            allowDrag={allowDrag}
            allowResize={allowResize}
          />
        </Scheduler>
      </Paper>
    </React.Fragment>
  );
};
