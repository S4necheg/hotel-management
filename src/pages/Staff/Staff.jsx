import React, { useState } from 'react';
import './index.scss'

import ModalStaff from './ModalStaff';

function Staff() {
    const [modalActive, setModalActive] = useState(false);

    return (
        <div className="staff mb-40 d-flex justify-between align-center">
            <div className='staffContent d-flex flex-wrap'>
                <div className="staffHeader d-flex justify-between align-center" >
                    <h3>Список сотрудников</h3>
                    <span>Добавить</span>
                </div>
                <div className='card' onClick={() => setModalActive(true)}>
                    <img width={200} height={170} src='img/staff-card/staff-card.jpg' alt='staff-card' />
                    <h5>Муханин Александр Алексеевич</h5>
                    <p>Администратор</p>
                </div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
            </div>

            <ModalStaff active={modalActive} setActive={setModalActive} children={
                <div className='d-flex justify-between' >
                    <div className='infoStaff'>
                        <img width={200} height={200} src='img/staff-card/staff-card.jpg' alt='staff-card' />
                        <h5>Муханин Александр Алексеевич</h5>
                        <p>Администратор</p>
                    </div>
                    <div className='fullInfoStaff'>
                        <h3>Информация о сотруднике</h3>
                        <ul>
                            <li>
                                <span>Возраст: </span> <span>36 лет</span>
                            </li>
                            <li>
                                <span>Стаж работы: </span> <span>4 года</span>
                            </li>
                            <li>
                                <span>Телефон: </span> <span>+7 (989)-123-45-67</span>
                            </li>
                            <li>
                                <span>e-mail: </span> <span>a.muxanin@mail.ru</span>
                            </li>
                        </ul>
                    </div>
                </div>
            }/>
        </div>
        
    ) 
}

export default Staff;