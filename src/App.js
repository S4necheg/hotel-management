import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import Modal from './modals/Modal'

import Login from './pages/Login';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Guests from './pages/Guests';
import Staff from './pages/Staff';
import Schedule from './pages/Schedule';
import Services from './pages/Services';

function App() {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="header clear">
      {/* <Header />
      <div className="content p-50 d-if">
        <LeftPanel /> */}
        <Routes>

        <Route path="/login" exact element={
          <>
          <div className="login">
            <Login />
          </div>
          </>
          } />
          
          <Route path="/" exact element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-50 d-if">
            <LeftPanel />
            <Home />
          </div>
          </>
          } />

          <Route path="/registration" element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-50 d-if">
            <LeftPanel />
            <Registration />
          </div>
          </>
          } />

          <Route path="/guests" element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-50 d-if">
            <LeftPanel />
            <Guests />
          </div>
          </>
          } />

          <Route path="/staff" element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-50 d-if">
            <LeftPanel />
            <Staff />
          </div>
          </>
          } />

          <Route path="/schedule" element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-50 d-if">
            <LeftPanel />
            <Schedule />
          </div>
          </>
          } />

          <Route path="/services" element={
          <>
          <Header setModalActive={setModalActive} />
          <div className="content p-50 d-if">
            <LeftPanel />
            <Services />
          </div>
          </>
          } />

        </Routes>
        {/* <button onClick={() => setModalActive(true)} /> */}
        
        <Modal active={modalActive} setActive={setModalActive}>
          <div className="bottom">
            <h4>Добро пожаловать, <span className="opacity-7">Test</span></h4>
            <p className="opacity-5">Администратор</p>
          </div>
          <ul>
              <Link to="/settings">
                <li className="d-flex align-center cu-p pt-15 pb-15" onClick={() => setModalActive(false)}>
                    <img width={30} height={30} className="mr-15" src="img/settings.svg" alt="Settings" />
                    <span>Настройки аккаунта</span>
                </li>
              </Link>
              <Link to="/login">
                <li className="d-flex align-center cu-p pt-15 pb-15" onClick={() => setModalActive(false)}>
                    <img width={30} height={30} className="mr-15" src="img/exit.svg" alt="Exit" />
                    <span>Выход</span>
                </li>
              </Link>
            </ul>
        </Modal>
        
      {/* </div> */}
    </div>
  );
}

export default App;
