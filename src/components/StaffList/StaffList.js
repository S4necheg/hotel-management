import React from 'react';
import '../../pages/Home/index.scss'

import moment from 'moment';

function StaffList({title, startDate, items, workSchedule}) { 

    let date = moment();
    date = date.toISOString();

    startDate = startDate.toString().substr(0, 10)

    //проверка что на текущую дату есть сотрудники работающие
    if (date.substr(0, 10) === startDate) {
        let jobTitle = ''
        for (let i = 0; i < items.length; i++) {
            if (items[i].title === title) {
                jobTitle = items[i].jobTitle
            }
        }
        return (
            <div className='bottom'>
                <span>{title}</span>
                <p className="opacity-5">{jobTitle}</p>
            </div>
        )
    }
}

export default StaffList;