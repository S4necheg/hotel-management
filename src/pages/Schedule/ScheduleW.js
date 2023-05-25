import * as React from 'react';
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

import { appointments } from '../Home/demo-data/appointments';

const PREFIX = 'Demo';
export const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
  formControlLabel: `${PREFIX}-formControlLabel`,
};

let currentDate = '2023-05-27';

export default () => {
  const [data, setData] = React.useState(appointments);
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
      setData([...data, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
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

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    //return <div />;
    return (
      <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}   
    >
    </AppointmentForm.BasicLayout>
    )
  };

  const BoolEditor = (props) => {
    return null;
  };

  const LabelComponent = (props) => {
    if (props.text === 'Details') {
      return <AppointmentForm.Label
      { ...props} 
      text="Создание смены"
      />  
    } else if (props.text === 'More Information') {
      return null
    } else if (props.text === '-') {
      return <AppointmentForm.Label
      { ...props}
      />  
    }
  };

  const InputComponent = (props) => {
    if (props.type === 'titleTextEditor') {
      return <AppointmentForm.TextEditor
      { ...props}
      type='textEditor'
      placeholder='ФИО'
      />
    }

    return <AppointmentForm.TextEditor
    { ...props}
    type='textEditor'
    placeholder='Должность'
    />
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

          <TodayButton />
          
          <ViewSwitcher />

          <Appointments />

          <AppointmentTooltip
            showOpenButton
            showDeleteButton={allowDeleting}
          />
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            textEditorComponent={InputComponent}
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
