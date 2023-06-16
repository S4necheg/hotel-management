import React from 'react';
import ContentLoader from "react-content-loader";
import './index.scss'

import ScheduleW from './ScheduleW';
//import AppContext from '../../context';

function Schedule({isLoading}) {
    // const {workSchedule, setWorkSchedule} = React.useContext(AppContext)

    return (
        <div className="schedule">
            <div className='inSchedule'>
                {isLoading ? 
                (  <ContentLoader 
                    speed={2}
                    width={1400}
                    height={700}
                    viewBox="0 0 1400 700"
                    backgroundColor="#FFFFFF"
                    foregroundColor="#F4F8FB"
                  >
                    <rect x="0" y="0" rx="10" ry="10" width="1400" height="700" />
                  </ContentLoader>)
                : 
                (<ScheduleW />)}
                {/* <ScheduleW 
                // workSchedule={workSchedule}
                // setWorkSchedule={setWorkSchedule}
                /> */}
            </div>
        </div>
    )
}

export default Schedule;