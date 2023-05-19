import React, { useState } from 'react';
import './index.scss'

import ModalServices from './ModalServices'

function Services() {
    const [modalActive, setModalActive] = useState(false);
    
    return (
        <div className="services">
            <div className='servicesContent d-flex flex-wrap'>
                <div className="servicesHeader d-flex justify-between align-center" >
                    <h3>Список услуг</h3>
                    <span>Добавить</span>
                </div>
                <div className='card' onClick={() => setModalActive(true)}>
                    <img width={200} height={170} src='img/services-card/car-card.jpg' alt='' />
                    <h5>Охраняемая стоянка</h5>
                    <p>Нажмите для просмотра информации</p>
                </div>
                <div className='card' onClick={() => setModalActive(true)}>
                    <img width={200} height={170} src='img/services-card/clean-card.jpg' alt='' />
                    <h5>Уборка номера</h5>
                    <p>Нажмите для просмотра информации</p>
                </div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
                <div className='card' ></div>
            </div>

            <ModalServices active={modalActive} setActive={setModalActive} children={
                <div className='d-flex justify-between' >
                    <div className='infoServices'>
                        <img width={200} height={200} src='img/services-card/car-card.jpg' alt='car-card' />
                        <h5>Охраняемая стоянка</h5>
                    </div>
                    <div className='fullInfoServices'>
                        <h3>Информация о парковке</h3>
                        <ul>
                            <li>
                                <span>Количество мест: </span> <span>40</span>
                            </li>
                            <li>
                                <span>Занято: </span> <span>23</span>
                            </li>
                            <li>
                                <span>Свободно: </span> <span>17</span>
                            </li>
                            <li>
                                <span>Номер: </span> <span>+7 (989)-123-45-67</span>
                            </li>
                        </ul>
                    </div>
                </div>
            }/>
        </div>
    )
}

export default Services;