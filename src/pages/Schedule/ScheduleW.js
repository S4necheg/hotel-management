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
  Resources,
  AppointmentTooltip,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';

import {
  pink, purple, indigo, red, lightBlue, cyan, lightGreen, lime, yellow, orange, 
} from '@mui/material/colors';

import AppContext from '../../context';
import NET from '../../network';
import axios from 'axios';

// const appointmentsWorkSchedule = [
//   {
//     id: 0,
//     title: 'Муханин Александр Алексеевич',
//     text:'Муханин Александр Алексеевич',
//     startDate: new Date(2023, 4, 30, 9, 0),
//     endDate: new Date(2023, 4, 30, 11, 30),
//   }, {
//     id: 1,
//     title: 'Артемов Артем Сергеевич',
//     text:'Артемов Артем Сергеевич',
//     startDate: new Date(2023, 5, 1, 19, 0),
//     endDate: new Date(2023, 5, 1, 21, 30),
//   }, {
//     id: 2,
//     title: 'Манушаков Родион Каренович',
//     text: 'Манушаков Родион Каренович',
//     startDate: new Date(2023, 4, 31, 14, 30),
//     endDate: new Date(2023, 4, 31, 15, 35),
//   },
//   {
//     id: 3,
//     title: 'Манушаков Родион Каренович',
//     text: 'Манушаков Родион Каренович',
//     startDate: new Date(2023, 4, 31, 14, 30),
//     endDate: new Date(2023, 4, 31, 15, 35),
//   },
// ];

const colors = [
  {
    text: 'Темно синий',
    id: 1,
    color: indigo,
  }, {
    text: 'Розовый',
    id: 2,
    color: pink,
  }, {
    text: 'Фиолетовый',
    id: 3,
    color: purple,
  }, {
    text: 'Красный',
    id: 4,
    color: red,
  }, {
    text: 'Лайм',
    id: 5,
    color: lime,
  },
  {
    text: 'Синий',
    id: 6,
    color: lightBlue,
  },
  {
    text: 'Бирюзовый',
    id: 7,
    color: cyan,
  },
  {
    text: 'Зеленый',
    id: 8,
    color: lightGreen,
  },
  {
    text: 'Желтый',
    id: 9,
    color: yellow,
  },
  {
    text: 'Оранжевый',
    id: 10,
    color: orange,
  },
];

const resources = [
  {
    fieldName: 'Staff',
    title: 'Цвет',
    instances: colors,
  },
]
// //Для Select поля
// const selectItems = [
//   {
//     id: 'Муханин Александр Алексеевич',
//     text: 'Муханин Александр Алексеевич',
//   },
//   {
//     id: 'Манушаков Родион Каренович',
//     text: 'Манушаков Родион Каренович',
//   },
//   {
//     id: 'Артемов Артем Сергеевич',
//     text: 'Артемов Артем Сергеевич',
//   },
//   {
//     id: 'Динь Куок Ань',
//     text: 'Динь Куок Ань',
//   },
//   {
//     id: 'Савченко Владислав Андреевич',
//     text: 'Савченко Владислав Андреевич',
//   },
//   {
//     id: 'Семенов Олег Михайлович',
//     text: 'Семенов Олег Михайлович',
//   },
// ]

let currentDate = moment();

export default () => {
  const {workSchedule, setWorkSchedule} = React.useContext(AppContext)
  const [data, setData] = React.useState(workSchedule);
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);
  //Получение id изменненного объекта

  const {
    allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
  } = editingOptions;

  const onCommitChanges = React.useCallback(({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      const newAdded = { id: startingAddedId, ...added }
      setData([...data, newAdded]);
      setWorkSchedule([...data, newAdded])
      // console.log({ id: startingAddedId, ...added })
      //запрос на добавление
      axios.post(`${NET.APP_URL}/work_schedules`, newAdded);
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
      setWorkSchedule(searchChange);
      //запрос на обновление
      console.log('changedId', changedId)
      console.log('objChanged', objChanged)
      axios.put(`${NET.APP_URL}/work_schedules/${changedId}`, objChanged)
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted));
      setWorkSchedule(data.filter(appointment => appointment.id !== deleted))
      //Запрос на удаление
      axios.delete(`${NET.APP_URL}/work_schedules/${deleted}`)
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
      text="Создание смены"
      />  
    } else if (props.text === 'More Information') {
      return <AppointmentForm.Label
      { ...props}
      text="Выбор цвета"
      />  
    } else if (props.text === '-') {
      return <AppointmentForm.Label
      { ...props}
      />  
    }
  };

  // const SelectComponent = (props) => {
  //   <AppointmentForm.Select 
  //   { ...props}
  //   availableOptions={[]}
  //   />
  // }

  // const InputComponent = (props) => {
  //   if (props.type === 'titleTextEditor') {
  //     // return <AppointmentForm.TextEditor
  //     // { ...props}
  //     // type='textEditor'
  //     // placeholder='ФИО'
  //     // />
  //     // return <div />

  //     //Для Select поля
  //     // return <AppointmentForm.Select 
  //     //   { ...props}
  //     //   // availableOptions={selectItems}
  //     //   availableOptions={workSchedule}
  //     // />
  //   }
  // };

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

          <IntegratedEditing 

          />

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
            notesLabel: 'Заметки'}}
            // basicLayoutComponent={BasicLayout}
            // textEditorComponent={InputComponent}
            booleanEditorComponent={BoolEditor}
            labelComponent={LabelComponent}

            commandButtonComponent={CommandButton}
            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
          />

          <Resources
            data={resources}
            mainResourceName="Staff"
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
