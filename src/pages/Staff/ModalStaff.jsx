import React from 'react';
import "./modalStaff.scss"

const ModalStaff = ({active, setActive, children}) => {
    return (
        <div className={active ? "modalStaff active" : "modalStaff"} onClick={() => setActive(false)}>
            <div className={active ? "modalStaffContent active" : "modalStaffContent"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalStaff;