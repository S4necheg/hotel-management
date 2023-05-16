import React, { useState } from 'react';
import './index.scss'

import ScheduleToDay from './ScheduleToDay';
import ChartHeaderM from './ChartHeaderM'
import ChartHeaderD from './ChartHeaderD'

function Home() {
    const [showChart, setShowChart] = useState(true)
    
    return (
        <div className="home">
            <div className='homeHeader d-flex justify-between align-center'>
                <div className='pl-20'>
                    <h1 className="">300 &#8381;</h1>
                    <p className="opacity-5">Средняя прибыль</p>
                </div>
                {showChart ? <ChartHeaderM /> : <ChartHeaderD />}
                <div className='d-flex'>
                    <span className={showChart ? "nav" : ""} onClick={() => setShowChart(true)}>Месяц</span>
                    <span className={showChart ? "" : "nav"} onClick={() => setShowChart(false)}>День</span>
                </div>
            </div>
            <div className='homeContent d-flex justify-between align-center'>
                <div className='homeGraph'>
                    <div className="ml-20 mr-20">
                        <h3>Заселение на сегодня:</h3>
                        <ScheduleToDay />
                    </div>

                </div>
                <div className='homeInfo'>
                    <div className="ml-20 mr-20">
                        <h3>Сегодня дежурят:</h3>
                    </div>
                    <div className='bottom'>
                        <span>Ольга Белореченко</span>
                        <p className="opacity-5">Администратор</p>
                    </div>
                    <div className='bottom'>
                        <span>Ольга Белореченко</span>
                        <p className="opacity-5">Горничная</p>
                    </div>
                    <div className='bottom'>
                        <span>Ольга Белореченко</span>
                        <p className="opacity-5">Повар</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;