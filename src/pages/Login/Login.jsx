import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormControlLabel, Checkbox } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input'

function Login() {
    const [visiblePass, setVisiblePass] = useState(false);

        const [phone, setPhone] = React.useState('')
      
        const handleChange = (newPhone) => {
          setPhone(newPhone)
        }
      

    return (
        <div className="wrapper d-flex justify-between align-center mb-40">
            <div className="authorization">
                <div className="d-flex flex-column align-center">
                    <div className="d-flex align-center p-40">
                        <img className="mr-15" width={40} height={40} src="img/logo.svg" alt="Logotype" />
                        <h3 className="text-uppercase">Hotel management</h3>
                    </div>
                    <div className="d-flex flex-column align-center">
                        <h2 className="color-text">Привет, с возвращением!</h2>
                        <p className="opacity-5">Введите свои данные для продолжения</p>
                        <h5 className="opacity-8">Авторизация по номеру телефона</h5>
                        {/* <input type="tel" maxlength="17" className="mb-20" placeholder="Номер телефона" /> */}
                        <MuiTelInput className="inputLogin mb-20" placeholder="Номер телефона" value={phone} onChange={handleChange} />
                        <input className="inputPass" type={visiblePass ? "" : "password"} placeholder="Пароль" />
                        <span className="pass-icon" ><img width={20} height={20} src={visiblePass ? "img/eye-on.svg" : "img/eye-off.svg"} onClick={() => setVisiblePass(!visiblePass)} alt="View-pass" /></span>
                        <div className="input-checkbox d-flex justify-between align-center mb-15">
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Запомнить меня" className='clear' />
                            <span className="color-text cu-p">Забыли пароль?</span>
                        </div>
                        <Link to="/hotel-management/">
                            <button className="button-auto"><span className="opacity-8">Войти</span></button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;