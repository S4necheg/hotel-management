import React, { useState } from 'react';
import './index.scss'

import StaffList from '../../components/StaffList/StaffList';

import AppContext from '../../context';

import ScheduleToDay from './ScheduleToDay';
import ChartHeaderM from './ChartHeaderM'
import ChartHeaderD from './ChartHeaderD'

import ContentLoader from "react-content-loader";

function Home({isLoading}) {
    const [showChart, setShowChart] = useState(true)

    const {workSchedule, items} = React.useContext(AppContext)

    //Отображение списка сотрудников на странице
    const renderList = () => {
        return workSchedule.map((item, index) => (
            <StaffList 
                key = {index}
                title = {item.title}
                startDate={item.startDate}
                items = {items}
                workSchedule = {workSchedule}
                {...item}
            />
        ))
    };
    
    return (
        <div className="home">
            <div className='homeHeader d-flex justify-between align-center'>
                {isLoading ? 
                ( <ContentLoader 
                    speed={2}
                    width={1400}
                    height={120}
                    viewBox="0 0 1400 120"
                    backgroundColor="#64b5f6"
                    foregroundColor="#F4F8FB"
                  >
                    <rect x="0" y="0" rx="10" ry="10" width="1400" height="120" />
                  </ContentLoader>) :
                (<><div className='pl-20'>
                    <h1 className="">19 000 &#8381;</h1>
                    <p className="opacity-5">Средняя прибыль</p>
                </div>
                {showChart ? <ChartHeaderM /> : <ChartHeaderD />}
                <div className='d-flex'>
                    <span className={showChart ? "nav" : ""} onClick={() => setShowChart(true)}>Месяц</span>
                    <span className={showChart ? "" : "nav"} onClick={() => setShowChart(false)}>День</span>
                </div>
                </>)}
            </div>
            <div className='homeContent d-flex justify-between align-center'>
                <div className='homeGraph'>
                    {isLoading ? 
                    (<ContentLoader 
                        speed={2}
                        width={900}
                        height={560}
                        viewBox="0 0 900 560"
                        backgroundColor="#FFFFFF"
                        foregroundColor="#F4F8FB"
                    >
                        <rect x="0" y="0" rx="10" ry="10" width="900" height="560" />
                    </ContentLoader>) : (
                    <div className="ml-20 mr-20">
                        <h3>Заселения и выселения на сегодня:</h3>
                        <ScheduleToDay />
                    </div>
                    )}
                </div>
                <div className='homeInfo'>
                    {isLoading ?
                    (<ContentLoader 
                        speed={2}
                        width={480}
                        height={560}
                        viewBox="0 0 480 560"
                        backgroundColor="#FFFFFF"
                        foregroundColor="#F4F8FB"
                    >
                        <rect x="0" y="0" rx="10" ry="10" width="480" height="560" />
                    </ContentLoader>) : (
                    <>
                    <div className="ml-20 mr-20">
                        <h3>Сегодня дежурят:</h3>
                    </div>
                    {renderList()}
                    </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;