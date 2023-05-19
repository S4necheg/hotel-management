import React, { useState } from 'react';
import './index.scss'

import { TablePagination, TableContainer, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Alert, AlertTitle } from '@mui/material';

import TextField from '@mui/material/TextField';

function Guests() {
    const guests = [
        {id: '1', firstName: 'Артем', lastName: 'Артемов', numberRoom: '101', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '2', firstName: 'Динь', lastName: 'Куок', numberRoom: '102', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '3', firstName: 'Родион', lastName: 'Манушаков', numberRoom: '103', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '4', firstName: 'Александр', lastName: 'Муханин', numberRoom: '104', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '5', firstName: 'Владислав', lastName: 'Савченко', numberRoom: '105', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '6', firstName: 'Олег', lastName: 'Семенов', numberRoom: '106', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '7', firstName: 'Алина', lastName: 'Турабоева', numberRoom: '107', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '8', firstName: 'Артем', lastName: 'Артемов', numberRoom: '101', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '9', firstName: 'Динь', lastName: 'Куок', numberRoom: '102', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '10', firstName: 'Родион', lastName: 'Манушаков', numberRoom: '103', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '11', firstName: 'Александр', lastName: 'Муханин', numberRoom: '104', dateIn: '18.05.2023', dateOut: '24.05.2023'},
        {id: '12', firstName: 'Владислав', lastName: 'Савченко', numberRoom: '105', dateIn: '18.05.2023', dateOut: '24.05.2023'},
    ]

    const [rows, setRows] = useState(guests)
    const [alert, setAlert] = useState(false)
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
    const [addGuest, setAddGuest] = useState(false)

    return (
        <div className="guests">
            {goAdddedPage ? (
                <div className='guestsAddContent'>
                    <div className="guestsHeader d-flex justify-between align-center" >
                        <h3>Добавление гостя</h3>
                        <span onClick={() => {setGoAddedPage(false); setAddGuest(true)}}>Добавить</span>
                    </div>
                    <div className='guestsAddField'>
                        <TextField
                            className='TextField'
                            required
                            id="outlined-required"
                            label="Имя"
                            variant="outlined"
                        />
                        <TextField
                            className='TextField'
                            required
                            id="outlined-required"
                            label="Фамилия"
                            variant="outlined"
                        />
                        <TextField
                            className='TextField'
                            required
                            id="outlined-required"
                            label="Номер"
                            variant="outlined"
                            type="number"
                        />
                        <TextField
                            className='TextField'
                            required
                            id="outlined-required"
                            label="Дата заезда"
                            variant="outlined"
                        />
                        <TextField
                            className='TextField'
                            required
                            id="outlined-required"
                            label="Дата отъезда"
                            variant="outlined"
                        />
                    </div>
                </div>
            )
            :(<div className='guestsContent'>
                <div>
                    <div className="guestsHeader d-flex justify-between align-center" >
                        <h3>Гости</h3>
                        <span onClick={() => {setGoAddedPage(true)}}>Добавить</span>
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
        </div>
    ) 
}

export default Guests;