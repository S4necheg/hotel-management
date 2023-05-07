import React from 'react'
import { Link } from 'react-router-dom';

function LeftPanel() {

    return (
        <div className="leftPanel">
          <h4>Основное</h4>
            <ul>
              <div className="bottom">
                <li className="cu-p p-15">
                  <Link to="/">
                    <img width={20} height={20} src="img/home.svg" alt="Home" />
                    <span>Главная</span>
                  </Link>
                </li>
              </div>
              <div className="bottom">
                <h4>Отель</h4>
                <li className="cu-p p-15">
                  <Link to="/registration">
                    <img width={20} height={20} src="img/registration.svg" alt="Registration" />
                    <span>Регистрация и бронирование</span>
                  </Link>
                </li>
                <li className="cu-p p-15">
                  <Link to="/guests">
                    <img width={20} height={20} src="img/guests.svg" alt="Guests" />
                    <span>Гости</span>
                  </Link>
                </li>
                <li className="cu-p p-15">
                  <Link to="/staff">
                    <img width={20} height={20} src="img/staff.svg" alt="Staff" />
                    <span>Сотрудники</span>
                  </Link>
                </li>
                <li className="cu-p p-15">
                  <Link to="/Work-schedule">
                    <img width={20} height={20} src="img/work-schedule.svg" alt="Work-schedule" />
                    <span>График работы</span>
                  </Link>
                </li>
                <li className="cu-p p-15">
                  <Link to="/services">
                    <img width={20} height={20} src="img/services.svg" alt="Services" />
                    <span>Услуги</span>
                  </Link>
                </li>
              </div>
            </ul>
        </div>
    );
}

export default LeftPanel;        