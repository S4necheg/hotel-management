import React from 'react';
import ContentLoader from "react-content-loader";
import './index.scss'

import ScheduleReg from './ScheduleReg';

function Registration({isLoading}) {
    return (
        <div className="registration">
            <div className='inRegistration'>
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
                (<ScheduleReg />)}
            </div>
        </div>
    )
}

export default Registration;