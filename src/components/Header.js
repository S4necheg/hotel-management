import React from 'react';
import { Link } from 'react-router-dom';

function Header({setModalActive}) {
    return (
        <header className="d-flex justify-between align-center p-40">
        <Link to="/hotel-management">
            <div className="d-flex align-center cu-p">
            <img className="mr-15" width={40} height={40} src="img/logo.svg" alt="Logotype" />
            <div>
                <h3 className="text-uppercase">Hotel management</h3>
                <p className="opacity-5">Система управления отелем</p>
            </div>
            </div>
        </Link>
          <button className="d-flex justify-between align-center" onClick={() => setModalActive(true)}>
            <span className="m-10">Test</span>
            <img width={35} height={35} src="img/settings.svg" alt="Settings" />
          </button>
      </header>
    );
}

export default Header;