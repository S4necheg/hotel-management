import React, {useState} from 'react';
import '../../pages/Staff/index.scss'
import axios from 'axios';

import ModalStaff from '../../pages/Staff/ModalStaff'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Alert, AlertTitle } from '@mui/material';
import {IconButton} from '@mui/material';

import NET from '../../network'

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
    //Alert на неудачное удаление сотрудника
    const [errorAlert, setErrorAlert] = useState(false)
    //Удаление записи
    const removeCard = (id) => {
        try {
            setItems(items.filter((items) => items.id !== id ))
            setAlert(true)
            const newArray = items.filter(item => item.id !== id);
            const updatedArray = newArray.map((item, index) => ({ ...item, id: index + 1 }));
            axios.delete(`${NET.APP_URL}/staff/${id}`)
            setItems(updatedArray)
        } catch (error) {
            setErrorAlert(true)
        }
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
        {errorAlert ? <Alert className='Alert' onClose={() => setErrorAlert(false)} severity="error"><AlertTitle>Ошибка</AlertTitle>Неудалось удалить сотрудника!</Alert> : null}
        </>
    )
}

export default Card;