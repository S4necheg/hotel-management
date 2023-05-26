import React, {useState} from 'react';
import '../../pages/Staff/index.scss'

import ModalStaff from '../../pages/Staff/ModalStaff'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Alert, AlertTitle } from '@mui/material';
import {IconButton} from '@mui/material';

function Card({
    id,  
    title, 
    jobTitle,
    imageUrl,
    age,
    experience,
    number,
    mail,
    setItems,
    items,
}) {
    const [modalActive, setModalActive] = useState(false);
    //Alert на успешное удаление сотрудника
    const [alert, setAlert] = useState(false)
    //Удаление записи
    const removeCard = (id) => {
        setItems(items.filter((items) => items.id !== id ))
        setAlert(true)
    }
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
                    <div className='titleInfo'>
                        <h3>Информация о сотруднике</h3>
                        <IconButton className='buttonDelete' onClick={() => removeCard(id)} > <DeleteForeverIcon color='error' /> </IconButton>
                    </div>
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
                {/* <div><IconButton onClick={() => removeCard(id)} > <DeleteForeverIcon color='error' /> </IconButton></div> */}
            </div>
        }/>
        {alert ? <Alert className='Alert' onClose={() => setAlert(false)} severity="success"><AlertTitle>Успешно</AlertTitle>Запись удалена!</Alert> : null}
        </>
    )
}

export default Card;