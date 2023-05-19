import React from 'react';
import "./modalServices.scss"

const ModalServices = ({active, setActive, children}) => {
    return (
        <div className={active ? "modalServices active" : "modalServices"} onClick={() => setActive(false)}>
            <div className={active ? "modalServicesContent active" : "modalServicesContent"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalServices;