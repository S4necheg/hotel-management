import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './index.scss'

function Settings() {
    const [visiblePass, setVisiblePass] = useState(false);

    return (
        <div className="wrapper d-flex justify-between align-center mb-40">
            <div className="settingsUser">
                <div className="d-flex flex-column align-center">
                    <div className="d-flex align-center p-40">
                        <img className="mr-15" width={40} height={40} src="img/logo.svg" alt="Logotype" />
                        <h3 className="text-uppercase">Hotel management</h3>
                    </div>
                    <div className="settingsContent">
                        <h2 className="color-titlte">Настройки аккаунта</h2>
                        <ul className='settingsField'>
                            <li>
                                <span className='titleInputSettings'>Имя пользователя: </span> 
                                <input className='inputReadOnly' value="Test" readOnly></input>
                            </li>
                            <li>
                                <span className='titleInputSettings'>Логин: </span> 
                                <input className='inputReadOnly' value="+7 (989) 123-45-67" readOnly></input>
                            </li>
                            <li>
                                <span className='titleInputSettings'>Пароль: </span> 
                                <div className='passInput'>
                                    <input className='inputSettingsPass' type={visiblePass ? "" : "password"} placeholder="Пароль"></input>
                                    <span className="pass-view" ><img width={20} height={20} src={visiblePass ? "img/eye-on.svg" : "img/eye-off.svg"} onClick={() => setVisiblePass(!visiblePass)} alt="View-pass" /></span>
                                </div>
                            </li>
                            <li>
                                <span className='titleInputSettings'>Повторите пароль: </span> 
                                <div className='passInput'>
                                    <input className='inputSettingsPass' type={visiblePass ? "" : "password"} placeholder="Повторите пароль"></input>
                                    <span className="pass-view" ><img width={20} height={20} src={visiblePass ? "img/eye-on.svg" : "img/eye-off.svg"} onClick={() => setVisiblePass(!visiblePass)} alt="View-pass" /></span>
                                </div>
                            </li>
                        </ul>
                        <Link to="/hotel-management/">
                            <button className="button-settings"><span className="opacity-8">Сохранить и вернуться назад</span></button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;