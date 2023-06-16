import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import AppContext from './context';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import Modal from './modals/Modal'

import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
import Guests from './pages/Guests/Guests';
import Staff from './pages/Staff/Staff';
import Schedule from './pages/Schedule/Schedule';
// import Services from './pages/Services/Services';

import NET from './network'

function App() {
  const [modalActive, setModalActive] = useState(false);
  //информация о гостях
  const [rows, setRows] = useState([]);
  //информация о сотрудниках
  const [items, setItems] = useState([])
  //информация о графике работы
  const [workSchedule, setWorkSchedule] = useState([])
  //информация о регистрациях
  const [checkIn, setCheckIn] = useState([])
  //информация о заселениях
  const [arrival, setArrival] = useState([])
  //информация о выселениях
  const [departure, setDeparture] = useState([])
  // //информация об авторизованном пользователе
  // const [users, setUsers] = useState([])
  //состояние загрузки
  const [isLoading, setIsLoading] = React.useState(true);
  //получаем данные с бека
  React.useEffect(() => {
    async function fetchData() { 
      try {
        const workScheduleResponse = await axios.get(`${NET.APP_URL}/work_schedules`);
        const rowsResponse = await axios.get(`${NET.APP_URL}/guests`);
        const itemsResponse = await axios.get(`${NET.APP_URL}/staff`);
        const checkInResponse = await axios.get(`${NET.APP_URL}/registrations`);
        const arrivalResponse = await axios.get(`${NET.APP_URL}/arrival_to_days`);
        const departureResponse = await axios.get(`${NET.APP_URL}/departure_to_days`);

        // const usersResponse = await axios.get(`${NET.APP_URL}/users`);

        // if (request.data.status === 'OK') {
        //   const usersResponse = await axios.get(`${NET.APP_URL}/users`);
        //   setUsers(usersResponse.data)
        // }

        setIsLoading(false)

        setWorkSchedule(workScheduleResponse.data);
        setRows(rowsResponse.data);
        setItems(itemsResponse.data);
        setCheckIn(checkInResponse.data);
        setArrival(arrivalResponse.data);
        setDeparture(departureResponse.data);
        // setUsers(usersResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных')
      }
    }

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{rows, setRows, items, setItems, workSchedule, setWorkSchedule, checkIn, setCheckIn, arrival, departure}} >
    <div className="header clear">
      {/* <Header />
      <div className="content p-50 d-if">
        <LeftPanel /> */}
        <Routes>

        <Route path="hotel-management/login" exact element={
          <>
          <div className="login">
            <Login />
          </div>
          </>
          } />

          <Route path="hotel-management/settings" exact element={
          <>
          <div className="settings">
            <Settings />
          </div>
          </>
          } />
          
          <Route path="hotel-management" exact element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-40 d-if">
            <LeftPanel />
            <Home 
            isLoading = {isLoading}
            />
          </div>
          </>
          } />

          <Route path="hotel-management/registration" element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-40 d-if">
            <LeftPanel />
            <Registration 
            isLoading = {isLoading}
            />
          </div>
          </>
          } />

          <Route path="hotel-management/guests" element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-40 d-if">
            <LeftPanel />
            <Guests 
            isLoading = {isLoading}
            />
          </div>
          </>
          } />

          <Route path="hotel-management/staff" element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-40 d-if">
            <LeftPanel />
            <Staff 
            isLoading = {isLoading}
            />
          </div>
          </>
          } />

          <Route path="hotel-management/schedule" element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-40 d-if">
            <LeftPanel />
            <Schedule 
            isLoading={isLoading}
            />
          </div>
          </>
          } />

          {/* <Route path="hotel-management/services" element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-40 d-if">
            <LeftPanel />
            <Services />
          </div>
          </>
          } /> */}

        </Routes>
        
        <Modal active={modalActive} setActive={setModalActive}>
          <div className="bottom">
            <h4>Добро пожаловать, <span className="opacity-7">Test</span></h4>
            <p className="opacity-5">Администратор</p>
          </div>
          <ul>
              <Link to="/hotel-management/settings">
                <li className="d-flex align-center cu-p pt-15 pb-15" onClick={() => setModalActive(false)}>
                    <img width={30} height={30} className="mr-15" src="img/settings.svg" alt="Settings" />
                    <span>Настройки аккаунта</span>
                </li>
              </Link>
              <Link to="/hotel-management/login">
                <li className="d-flex align-center cu-p pt-15 pb-15" onClick={() => setModalActive(false)}>
                    <img width={30} height={30} className="mr-15" src="img/exit.svg" alt="Exit" />
                    <span>Выход</span>
                </li>
              </Link>
          </ul>
        </Modal>
        
    </div>
    </AppContext.Provider>
  );
}

export default App;
