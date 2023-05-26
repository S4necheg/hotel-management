import React, {useState} from 'react';
import '../../pages/Staff/index.scss'

import ModalStaff from '../../pages/Staff/ModalStaff'

function Card({
    id,  
    title, 
    jobTitle,
    imageUrl,
    age,
    experience,
    number,
    mail,
}) {
    const [modalActive, setModalActive] = useState(false);

    return (
        <>
        <div className='card' onClick={() => {setModalActive(true)}}>
            <img width={200} height={170} src={imageUrl} alt='staff-card'/>
            <h5>{title}</h5>
            <p>{jobTitle}</p>
        </div>

        <ModalStaff active={modalActive} setActive={setModalActive} children={
            <div className='d-flex justify-between' >
                <div className='infoStaff'>
                    <img width={200} height={200} src={imageUrl} alt='staff-card' />
                    <h5>{title}</h5>
                    <p>{jobTitle}</p>
                </div>
                <div className='fullInfoStaff'>
                    <h3>Информация о сотруднике</h3>
                    <ul>
                        <li>
                            <span>Возраст: </span> <span>{age} лет</span>
                        </li>
                        <li>
                            <span>Стаж работы: </span> <span>{experience} года</span>
                        </li>
                        <li>
                            <span>Телефон: </span> <span>{number}</span>
                        </li>
                        <li>
                            <span>e-mail: </span> <span>{mail}</span>
                        </li>
                    </ul>
                </div>
            </div>
        }/>
        </>
    )
}

export default Card;