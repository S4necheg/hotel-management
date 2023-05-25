import React, { useState } from 'react';
import './index.scss'

import { TablePagination, TableContainer, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Alert, AlertTitle } from '@mui/material';

import TextField from '@mui/material/TextField';

function Guests() {
    // const guests = [
    //     {id: '1', firstName: 'Артем', lastName: 'Артемов', numberRoom: '101', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '2', firstName: 'Динь', lastName: 'Куок', numberRoom: '102', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '3', firstName: 'Родион', lastName: 'Манушаков', numberRoom: '103', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '4', firstName: 'Александр', lastName: 'Муханин', numberRoom: '104', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '5', firstName: 'Владислав', lastName: 'Савченко', numberRoom: '105', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '6', firstName: 'Олег', lastName: 'Семенов', numberRoom: '106', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '7', firstName: 'Алина', lastName: 'Турабоева', numberRoom: '107', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '8', firstName: 'Артем', lastName: 'Артемов', numberRoom: '101', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '9', firstName: 'Динь', lastName: 'Куок', numberRoom: '102', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '10', firstName: 'Родион', lastName: 'Манушаков', numberRoom: '103', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '11', firstName: 'Александр', lastName: 'Муханин', numberRoom: '104', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    //     {id: '12', firstName: 'Владислав', lastName: 'Савченко', numberRoom: '105', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    // ]

    const [rows, setRows] = useState([
        {id: '1', firstName: 'Артем', lastName: 'Артемов', numberRoom: '101', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '2', firstName: 'Динь', lastName: 'Куок', numberRoom: '102', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '3', firstName: 'Родион', lastName: 'Манушаков', numberRoom: '103', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '4', firstName: 'Александр', lastName: 'Муханин', numberRoom: '104', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '5', firstName: 'Владислав', lastName: 'Савченко', numberRoom: '105', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '6', firstName: 'Олег', lastName: 'Семенов', numberRoom: '106', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '7', firstName: 'Алина', lastName: 'Турабоева', numberRoom: '107', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    ])
    const [alert, setAlert] = useState(false)
    //Удаление записи
    const removeRows = (id) => {
        setRows(rows.filter((rows) => rows.id !== id ))
        setAlert(true)
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
    //Alert для успешного создания новой записи
    const [addGuest, setAddGuest] = useState(false)
    //Alert при неудачном создании записи
    const [errorAddGuest, setErrorAddGuest] = useState(false)
    //ID для новых записей
    const [id, setId] = useState(rows.length + 1)
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
        console.log(addGuest)
        if(goAdddedPage === true) {
           setRows((rows) => [...rows, {id: id, firstName: valueFN, lastName: valueLN, numberRoom: valueNR, dateIn: valueDI, dateOut: valueDO}])
           setId(id + 1)
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
            setErrorAddGuest(true)
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
            {addGuest ? <Alert className='Alert' onClose={() => setAddGuest(false)} severity="success"><AlertTitle>Успешно</AlertTitle>Запись добавлена!</Alert> : null}
            {errorAddGuest ? <Alert className='Alert' onClose={() => setErrorAddGuest(false)} severity="error"><AlertTitle>Ошибка</AlertTitle>Заполните все поля!</Alert> : null}
        </div>
    ) 
}

export default Guests;