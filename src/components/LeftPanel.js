import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function LeftPanel() {
  const [active, setActive] = useState('main');

    return (
        <div className="leftPanel">
          <h4>Основное</h4>
            <ul>
              <div className="bottom">
              <Link to="/">
                <li className={active === 'main' ? "nav_item cu-p p-15" : "cu-p p-15"} onClick={() => setActive('main')}>
                    <img width={20} height={20} src="img/home.svg" alt="Home" />
                    <span>Главная</span>
                </li>
              </Link>
              </div>
              <div className="bottom">
                <h4>Отель</h4>
              <Link to="/registration">
                <li className={active === 'reg' ? "nav_item cu-p p-15" : "cu-p p-15"} onClick={() => setActive('reg')}>
                    <img width={20} height={20} src="img/registration.svg" alt="Registration" />
                    <span>Регистрация и бронирование</span>
                </li>
              </Link>
              <Link to="/guests">
                <li className={active === 'guests' ? "nav_item cu-p p-15" : "cu-p p-15"} onClick={() => setActive('guests')}>
                    <img width={20} height={20} src="img/guests.svg" alt="Guests" />
                    <span>Гости</span>
                </li>
              </Link>
              <Link to="/staff">
                <li className={active === 'staff' ? "nav_item cu-p p-15" : "cu-p p-15"} onClick={() => setActive('staff')}>
                    <img width={20} height={20} src="img/staff.svg" alt="Staff" />
                    <span>Сотрудники</span>
                </li>
              </Link>
              <Link to="/schedule">
                <li className={active === 'sched' ? "nav_item cu-p p-15" : "cu-p p-15"} onClick={() => setActive('sched')}>
                    <img width={20} height={20} src="img/work-schedule.svg" alt="Work-schedule" />
                    <span>График работы</span>
                </li>
              </Link>
              <Link to="/services">
                <li className={active === 'serv' ? "nav_item cu-p p-15" : "cu-p p-15"} onClick={() => setActive('serv')}>
                    <img width={20} height={20} src="img/services.svg" alt="Services" />
                    <span>Услуги</span>
                </li>
              </Link>
              </div>
            </ul>
        </div>
    );
}

export default LeftPanel;        