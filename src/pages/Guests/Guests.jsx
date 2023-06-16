import React, { useState } from 'react';
import './index.scss'
import axios from 'axios';
import AppContext from '../../context';

import { TablePagination, TableContainer, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Alert, AlertTitle } from '@mui/material';

import TextField from '@mui/material/TextField';

import NET from '../../network'

import ContentLoader from "react-content-loader";

function Guests({isLoading}) {
    // const [rows, setRows] = useState([
    //     {id: '1', firstName: 'Артем', lastName: 'Артемов', numberRoom: '101', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '2', firstName: 'Динь', lastName: 'Куок', numberRoom: '102', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '3', firstName: 'Родион', lastName: 'Манушаков', numberRoom: '103', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '4', firstName: 'Александр', lastName: 'Муханин', numberRoom: '104', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '5', firstName: 'Владислав', lastName: 'Савченко', numberRoom: '105', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '6', firstName: 'Олег', lastName: 'Семенов', numberRoom: '106', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '7', firstName: 'Алина', lastName: 'Турабоева', numberRoom: '107', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    // ])

    const {rows, setRows} = React.useContext(AppContext)

    //Удаление записи
    const removeRows = (id) => {
        try {
            setRows(rows.filter((rows) => rows.id !== id ))
            setAlert(true)
            const newArray = rows.filter(item => item.id !== id);
            const updatedArray = newArray.map((item, index) => ({ ...item, id: index + 1 }));
            axios.delete(`${NET.APP_URL}/guests/${id}`)
            setRows(updatedArray)
        } catch (error) {
            setErrorAlert(true)
        }
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    const [goAdddedPage, setGoAddedPage] = useState(false)
    //Alert на успешное удаление сотрудника
    const [alert, setAlert] = useState(false)
    //Alert на неудачное удаление сотрудника
    const [errorAlert, setErrorAlert] = useState(false)
    //Alert для успешного создания новой записи
    const [addGuest, setAddGuest] = useState(false)
    //Alert при неудачном создании записи
    const [errorAddGuest, setErrorAddGuest] = useState(false)
    //Alert при незаполненом поле у новой записи
    const [errorTextField, setErrorTextField] = useState(false)
    //Поля для новой записи
    const [valueFN, setValueFN] = useState("")
    const [valueLN, setValueLN] = useState("")
    const [valueNR, setValueNR] = useState("")
    const [valueDI, setValueDI] = useState("")
    const [valueDO, setValueDO] = useState("")
    //Передача введенного текста из полей в value
    const handleChangeFN = e => {
        //console.log(`Typed => ${e.target.valueFN}`)
        setValueFN(e.target.value)
    }
    const handleChangeLN = e => {
        setValueLN(e.target.value)
    }
    const handleChangeNR = e => {
        setValueNR(e.target.value)
    }
    const handleChangeDI = e => {
        setValueDI(e.target.value)
    }
    const handleChangeDO = e => {
        setValueDO(e.target.value)
    }
    //Добавление новой записи при нажатии кнопки Добавить
    const updateRows = (rows) => {
        try {
            if(goAdddedPage === true) { 
               const newRow = {id: rows.length + 1, firstName: valueFN, lastName: valueLN, numberRoom: valueNR, dateIn: valueDI, dateOut: valueDO}
               setRows((rows) => [...rows, newRow])
               axios.post(`${NET.APP_URL}/guests`, newRow);
               axios.post(`${NET.APP_URL}/guests_data`, newRow); //Таблица со всеми гостями за все время
            }
        } catch (error) {
            setErrorAddGuest(true)
        }
    }
    //Очистка полей при повторном нажатии кнопки Добавить
    const cleanField = () => {
        setValueFN("")
        setValueLN("")
        setValueNR("")
        setValueDI("")
        setValueDO("")
        setErrorFN(false)
        setErrorLN(false)
        setErrorNR(false)
        setErrorDI(false)
        setErrorDO(false)
    }
    //Состояние полей ввода
    const [errorFN, setErrorFN] = useState(false)
    const [errorLN, setErrorLN] = useState(false)
    const [errorNR, setErrorNR] = useState(false)
    const [errorDI, setErrorDI] = useState(false)
    const [errorDO, setErrorDO] = useState(false)

    //Проверка на содержимое полей новой записи
    const goToTable = () => {
        if ((valueFN && valueLN && valueNR && valueDI && valueDO) !== "") {
            setGoAddedPage(false); 
            setAddGuest(true); 
            updateRows(rows);
        } else {
            if (valueFN === "") {
                setErrorFN(true)
            } else {
                setErrorFN(false)
            }
            if (valueLN === "") {
                setErrorLN(true)
            } else {
                setErrorLN(false)
            }
            if (valueNR === "") {
                setErrorNR(true)
            } else {
                setErrorNR(false)
            }
            if (valueDI === "") {
                setErrorDI(true)
            } else {
                setErrorDI(false)
            }
            if (valueDO === "") {
                setErrorDO(true)
            } else {
                setErrorDO(false)
            }
            setErrorTextField(true)
        }
    }

    return (
        <div className="guests">
            {goAdddedPage ? (
                <div className='guestsAddContent'>
                    <div className="guestsHeader d-flex justify-between align-center" >
                        <h3>Добавление гостя</h3>
                        <span onClick={() => {goToTable()}}>Добавить</span>
                    </div>
                    <div className='guestsAddField'>
                        <TextField
                            className='TextField'
                            required
                            error={errorFN}
                            id="outlined-required"
                            label="Имя"
                            variant="outlined"
                            value={valueFN}
                            onChange={handleChangeFN}
                        />
                        <TextField
                            className='TextField'
                            required
                            error={errorLN}
                            id="outlined-required"
                            label="Фамилия"
                            variant="outlined"
                            value={valueLN}
                            onChange={handleChangeLN}
                        />
                        <TextField
                            className='TextField'
                            required
                            error={errorNR}
                            id="outlined-required"
                            label="Номер"
                            variant="outlined"
                            type="number"
                            value={valueNR}
                            onChange={handleChangeNR}
                        />
                        <TextField
                            className='TextField'
                            required
                            error={errorDI}
                            id="outlined-required"
                            label="Дата заезда"
                            placeholder="Пример ввода: 01.01.2023"
                            variant="outlined"
                            value={valueDI}
                            onChange={handleChangeDI}
                        />
                        <TextField
                            className='TextField'
                            required
                            error={errorDO}
                            id="outlined-required"
                            label="Дата отъезда"
                            placeholder="Пример ввода: 01.01.2023"
                            variant="outlined"
                            value={valueDO}
                            onChange={handleChangeDO}
                        />
                    </div>
                </div>
            )
            :(<div className='guestsContent'>
                <div>
                    <div className="guestsHeader d-flex justify-between align-center" >
                        <h3>Гости</h3>
                        <span onClick={() => {setGoAddedPage(true); setAddGuest(false); cleanField()}}>Добавить</span>
                    </div>
                    {isLoading ?                 
                    ( <ContentLoader 
                        speed={2}
                        width={1400}
                        height={630}
                        viewBox="0 0 1400 630"
                        backgroundColor="#FFFFFF"
                        foregroundColor="#F4F8FB"
                    >
                    <rect x="0" y="0" rx="10" ry="10" width="1400" height="630" />
                  </ContentLoader>) : (
                    <TableContainer className='Container' maxWidth={1360} maxHeight={660}>
                        <Table>
                            <TableHead className='tableHeader' >
                                <TableRow>
                                    <TableCell>
                                        ID
                                    </TableCell>
                                    <TableCell>
                                        Имя
                                    </TableCell>
                                    <TableCell>
                                        Фамилия
                                    </TableCell>
                                    <TableCell>
                                        Номер комнаты
                                    </TableCell>
                                    <TableCell>
                                        Дата заезда
                                    </TableCell>
                                    <TableCell>
                                        Дата убытия
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(elem => 
                                    <TableRow>
                                        <TableCell>{elem.id}</TableCell>
                                        <TableCell>{elem.firstName}</TableCell>
                                        <TableCell>{elem.lastName}</TableCell>
                                        <TableCell>{elem.numberRoom}</TableCell>
                                        <TableCell>{elem.dateIn}</TableCell>
                                        <TableCell className='buttonDelete justify-between align-center'>
                                            {elem.dateOut}
                                                <IconButton onClick={() => removeRows(elem.id)} >
                                                    <DeleteForeverIcon color='error' />
                                                </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                  )}
                </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 7]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </div>
            )}
            {alert ? <Alert className='Alert' onClose={() => setAlert(false)} severity="success"><AlertTitle>Успешно</AlertTitle>Запись удалена!</Alert> : null}
            {errorAlert ? <Alert className='Alert' onClose={() => setErrorAlert(false)} severity="error"><AlertTitle>Ошибка</AlertTitle>Неудалось удалить запись!</Alert> : null}
            {addGuest ? <Alert className='Alert' onClose={() => setAddGuest(false)} severity="success"><AlertTitle>Успешно</AlertTitle>Запись добавлена!</Alert> : null}
            {errorAddGuest ? <Alert className='Alert' onClose={() => setErrorAddGuest(false)} severity="error"><AlertTitle>Ошибка</AlertTitle>Ошибка при добавлении записи!</Alert> : null}
            {errorTextField ? <Alert className='Alert' onClose={() => setErrorTextField(false)} severity="error"><AlertTitle>Ошибка</AlertTitle>Заполните все поля!</Alert> : null}
        </div>
    ) 
}

export default Guests;