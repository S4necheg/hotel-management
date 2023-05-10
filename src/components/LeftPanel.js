import React from 'react'
import { Link } from 'react-router-dom';

function LeftPanel() {

    return (
        <div className="leftPanel">
          <h4>Основное</h4>
            <ul>
              <div className="bottom">
              <Link to="/">
                <li className="cu-p p-15">
                    <img width={20} height={20} src="img/home.svg" alt="Home" />
                    <span>Главная</span>
                </li>
              </Link>
              </div>
              <div className="bottom">
                <h4>Отель</h4>
              <Link to="/registration">
                <li className="cu-p p-15">
                    <img width={20} height={20} src="img/registration.svg" alt="Registration" />
                    <span>Регистрация и бронирование</span>
                </li>
              </Link>
              <Link to="/guests">
                <li className="cu-p p-15">
                    <img width={20} height={20} src="img/guests.svg" alt="Guests" />
                    <span>Гости</span>
                </li>
              </Link>
              <Link to="/staff">
                <li className="cu-p p-15">
                    <img width={20} height={20} src="img/staff.svg" alt="Staff" />
                    <span>Сотрудники</span>
                </li>
              </Link>
              <Link to="/schedule">
                <li className="cu-p p-15">
                    <img width={20} height={20} src="img/work-schedule.svg" alt="Work-schedule" />
                    <span>График работы</span>
                </li>
              </Link>
              <Link to="/services">
                <li className="cu-p p-15">
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