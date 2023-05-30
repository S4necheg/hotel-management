import React, { useState } from 'react';
import './index.scss'
import axios from 'axios';
import AppContext from '../../context';

import Card from '../../components/Card/Card';

import { Alert, AlertTitle } from '@mui/material';
import TextField from '@mui/material/TextField';

import NET from '../../network'

function Staff() {
    const [goAdddedPage, setGoAddedPage] = useState(false)

    const {items, setItems} = React.useContext(AppContext)
    // const [items, setItems] = useState([
    //     {id: "1", title: "Муханин Александр Алексеевич", jobTitle: "Администратор", imageUrl: 'img/staff-card/staff-card4.svg', age: "36", experience: "4", number: "+7 (989)-123-45-67", mail: "a.muxanin@mail.ru"},
    //     {id: "2", title: "Манушаков Родион Каренович", jobTitle: "Горничная", imageUrl: 'img/staff-card/staff-card4.svg', age: "40", experience: "2", number: "+7 (111)-111-11-11", mail: "rodua@mail.ru"},
    //     {id: "3", title: "Артемов Артем Сергеевич", jobTitle: "Разгельдяй", imageUrl: 'img/staff-card/staff-card4.svg', age: "30", experience: "3", number: "+7 (000)-000-00-00", mail: "artem@mail.ru"},
    //     {id: "4", title: "Динь Куок Ань", jobTitle: "Разгельдяй", imageUrl: 'img/staff-card/staff-card4.svg', age: "30", experience: "8", number: "+7 (222)-222-22-22", mail: "dinh@mail.ru"},
    //     {id: "5", title: "Савченко Владислав Андреевич", jobTitle: "Разгельдяй", imageUrl: 'img/staff-card/staff-card4.svg', age: "34", experience: "6", number: "+7 (333)-333-33-33", mail: "vlad@mail.ru"},
    //     {id: "6", title: "Семенов Олег Михайлович", jobTitle: "Разгельдяй", imageUrl: 'img/staff-card/staff-card4.svg', age: "27", experience: "4", number: "+7 (444)-444-44-44", mail: "oleg@mail.ru"},
    // ])

    //Отображение карточек на странице
    const renderItems = () => {
        return items.map((item, index) => (
            <Card 
                key = {index}
                title = {item.title}
                jobTitle = {item.jobTitle}
                imageUrl = {item.imageUrl}
                age = {item.age}
                experience = {item.experience}
                number = {item.number}
                mail = {item.mail}
                items = {items}
                setItems = {setItems}
                {...item}
            />
        ))
    };
    //Alert для успешного создания новой записи
    const [addStaff, setAddStaff] = useState(false)
    //Alert при неудачном создании записи
    const [errorAddStaff, setErrorAddStaff] = useState(false)
    //Alert при незаполненом поле у новой записи
    const [errorTextField, setErrorTextField] = useState(false)
    //Поля для новой записи
    const [valueName, setValueName] = useState("")
    const [valueJob, setValueJob] = useState("")
    const [valueAge, setValueAge] = useState("")
    const [valueExp, setValueExp] = useState("")
    const [valueNumber, setValueNumber] = useState("")
    const [valueMail, setValueMail] = useState("")
    //Передача введенного текста из полей в value
    const handleChangeName = e => {
        setValueName(e.target.value)
    }
    const handleChangeJob = e => {
        setValueJob(e.target.value)
    }
    const handleChangeAge = e => {
        setValueAge(e.target.value)
    }
    const handleChangeExp = e => {
        setValueExp(e.target.value)
    }
    const handleChangeNumber = e => {
        setValueNumber(e.target.value)
    }
    const handleChangeMail = e => {
        setValueMail(e.target.value)
    }
    //Добавление нового сотрудника при нажатии кнопки Добавить
    const updateItems = (items) => {
        try {
            if(goAdddedPage === true) {
                const newItem = {id: items.length + 1, title: valueName, jobTitle: valueJob, imageUrl: 'img/staff-card/staff-card4.svg', age: valueAge, experience: valueExp, number: valueNumber, mail: valueMail}
                setItems((items) => [...items, newItem])
                axios.post(`${NET.APP_URL}/staff`, newItem);
            }
        } catch (error) {
            setErrorAddStaff(true)
        }
    }
    //Очистка полей при повторном нажатии кнопки Добавить
    const cleanField = () => {
        setValueName("")
        setValueJob("")
        setValueAge("")
        setValueExp("")
        setValueNumber("")
        setValueMail("")
        setErrorName(false)
        setErrorJob(false)
        setErrorAge(false)
        setErrorExp(false)
        setErrorNumber(false)
        setErrorMail(false)
    }
    //Состояние полей ввода
    const [errorName, setErrorName] = useState(false)
    const [errorJob, setErrorJob] = useState(false)
    const [errorAge, setErrorAge] = useState(false)
    const [errorExp, setErrorExp] = useState(false)
    const [errorNumber, setErrorNumber] = useState(false)
    const [errorMail, setErrorMail] = useState(false)
    //Проверка на содержимое полей нового сотрудника
    const goToCards = () => {
        if ((valueName && valueJob && valueAge && valueExp && valueNumber && valueMail) !== "") {
            setGoAddedPage(false); 
            setAddStaff(true); 
            updateItems(items);
        } else {
            if (valueName === "") {
                setErrorName(true)
            } else {
                setErrorName(false)
            }
            if (valueJob === "") {
                setErrorJob(true)
            } else {
                setErrorJob(false)
            }
            if (valueAge === "") {
                setErrorAge(true)
            } else {
                setErrorAge(false)
            }
            if (valueExp === "") {
                setErrorExp(true)
            } else {
                setErrorExp(false)
            }
            if (valueNumber === "") {
                setErrorNumber(true)
            } else {
                setErrorNumber(false)
            }
            if (valueMail === "") {
                setErrorMail(true)
            } else {
                setErrorMail(false)
            }
            setErrorTextField(true)
        }
    }

    return (
        <div className="staff mb-40 d-flex justify-between align-center">
            {goAdddedPage ? 
            (
            <div className='staffAddContent'>
                <div className="staffHeader d-flex justify-between align-center" >
                    <h3>Список сотрудников</h3>
                    <span onClick={() => {goToCards()}}>Добавить</span>
                </div>
                <div className='staffAddField'>
                    <TextField
                        className='TextField'
                        required
                        error={errorName}
                        id="outlined-required"
                        label="ФИО"
                        variant="outlined"
                        value={valueName}
                        onChange={handleChangeName}
                    />
                    <TextField
                        className='TextField'
                        required
                        error={errorJob}
                        id="outlined-required"
                        label="Должность"
                        variant="outlined"
                        value={valueJob}
                        onChange={handleChangeJob}
                    />
                    <TextField
                        className='TextField'
                        required
                        error={errorAge}
                        id="outlined-required"
                        label="Возраст"
                        variant="outlined"
                        type="number"
                        value={valueAge}
                        onChange={handleChangeAge}
                    />
                    <TextField
                        className='TextField'
                        required
                        error={errorExp}
                        id="outlined-required"
                        label="Стаж работы"
                        variant="outlined"
                        type="number"
                        value={valueExp}
                        onChange={handleChangeExp}
                    />
                    <TextField
                        className='TextField'
                        required
                        error={errorNumber}
                        id="outlined-required"
                        label="Номер"
                        placeholder="Пример ввода: +7 (000)-000-00-00"
                        variant="outlined"
                        value={valueNumber}
                        onChange={handleChangeNumber}
                    />
                    <TextField
                        className='TextField'
                        required
                        error={errorMail}
                        id="outlined-required"
                        label="e-mail"
                        variant="outlined"
                        placeholder="exapmle@mail.ru"
                        value={valueMail}
                        onChange={handleChangeMail}
                    />
                </div>
            </div>
            )
            :
            (
            <div className='staffContent d-flex flex-wrap'>
                <div className="staffHeader d-flex justify-between align-center" >
                    <h3>Список сотрудников</h3>
                    <span onClick={() => {setGoAddedPage(true); setAddStaff(false); cleanField()}}>Добавить</span>
                </div>
                {renderItems()}
            </div>
            )}
            {addStaff ? <Alert className='Alert' onClose={() => setAddStaff(false)} severity="success"><AlertTitle>Успешно</AlertTitle>Запись добавлена!</Alert> : null}
            {errorAddStaff ? <Alert className='Alert' onClose={() => setErrorAddStaff(false)} severity="error"><AlertTitle>Ошибка</AlertTitle>Ошибка при добавлении сотрудника!</Alert> : null}
            {errorTextField ? <Alert className='Alert' onClose={() => setErrorTextField(false)} severity="error"><AlertTitle>Ошибка</AlertTitle>Заполните все поля!</Alert> : null}
        </div>
        
    ) 
}

export default Staff;