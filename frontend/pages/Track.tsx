// import React from 'react'
import MyProgressBar from "../src/Component/Progress/MyProgressBar"
import "../src/Component/Progress/Track.css"
import Edit from '/Icons/edit.svg'
import Increase from '/Icons/increaseArrow.svg'
import Plus from '/Icons/plus.svg'
import filter from '/Icons/Filter/filter.svg'
import search from '/Icons/search.svg'
import filterActive from '/Icons/Filter/filter-active.svg'
import { workouts } from "../src/data"
import MyProgressChart from "../src/Component/Progress/MyProgressChart"
import { useState } from "react"
import Filter from "../src/Component/MyCalendar/Filter"
import AddMonthlyGoal from "../src/Component/MyModal/AddMonthlyGoal"




interface GoalHistoryProps {
    month: string;
    target: string;
    status: string;
}

const GoalHistory: React.FC<GoalHistoryProps> = ({ month, target, status }) => {
    return (
        <div className="d-flex justify-content-between goal-history-month">
            <h4 className="desktop-small medium m-0 p-0">{month}</h4>
            <div className="d-flex align-items-center gap-2 justify-content-end desktop-small regular">
                <span>{target}</span>
                <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="2" fill="#383838" />
                </svg>
                <span>{status}</span>
            </div>
        </div>
    );
};

type Props = {}

const Track = ({ }: Props) => {

    const [isFilterOn, setIsFilterOn] = useState(false)
    const [modalShow, setModalShow] = useState(false);



    const months = [
        { month: "December", target: "Maintain fitness", status: "In Progress" },
        { month: "November", target: "15 push-ups", status: "78%" },
        { month: "October", target: "50 squats", status: "89%" },
        { month: "September", target: "100 push-ups", status: "100%" },
        { month: "August", target: "10km run", status: "100%" },
        { month: "July", target: "5km run", status: "92%" },
        { month: "June", target: "50 crunches", status: "100%" },
        { month: "May", target: "30 sit-ups", status: "80%" },
        { month: "April", target: "20 lunges", status: "100%" },
        { month: "March", target: "5 pull-ups", status: "75%" },
        { month: "February", target: "15 squats", status: "90%" },
        { month: "January", target: "10 push-ups", status: "100%" },
    ];

    return (
        <div className="main-content track-container d-flex flex-column">

            <div className="d-flex track-top-container">
                <div className="flex-1 ultra-card track-monthly-goal gap-24 d-flex flex-column">
                    <div className="monthly-goal-header d-flex flex-column">
                        <h2 className="text-start desktop-heading-level-2 medium">Your monthly goal</h2>

                        <div className="monthly-goal-details-container d-flex flex-column">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex gap-1 align-items-center flex-1 desktop-medium medium">
                                    <span className="monthly-goal-detials-month">November</span>
                                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2" cy="2.5" r="2" fill="#383838" />
                                    </svg>
                                    <span className="monthly-goal-details-stats desktop-medium medium">
                                        15 push-ups 3 times per week
                                    </span>
                                </div>
                                <button className="border-0 bg-transparent">
                                    <img src={Edit} alt="" className="" />
                                </button>
                            </div>
                            <div>
                                <MyProgressBar />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex monthly-info gap-16">
                        <div className="monthly-goal bg-white">
                            <div className=" d-flex align-items-start justify-content-between flex-column monthly-goal-container">
                                <h3 className="desktop-heading-level-3">
                                    <img src={Increase} alt="" />
                                    10%
                                </h3>
                                <p className="text-start">
                                    goal reaching speed in comparison to last month
                                </p>
                            </div>
                        </div>
                        <div className="monthly-notes">
                            <div className="d-flex align-items-start justify-content-between flex-column monthly-notes-container">
                                <h3 className="desktop-heading-level-3">
                                    Notes:
                                </h3>
                                <p className="text-start">
                                    Goal reaching speed in comparison to last month. Goal reaching speed in comparison
                                </p>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="flex-1 ultra-card ">
                    <div className="d-flex flex-column gap-18">
                        <h2 className="text-start">Goal history</h2>
                        <div className="d-flex flex-column align-items-start gap-18">
                            <div className="d-flex flex-column gap-12">
                                <h3 className="text-start desktop-small regular">2024</h3>
                                <div className="month-history-details d-flex flex-column">
                                    {months.map(({ month, target, status }, index) => (
                                        <GoalHistory key={index} month={month} target={target} status={status} />
                                    ))}
                                </div>
                            </div>
                            <button className="border-0 bg-transparent align-items-center gap-2 d-flex text-start desktop-small medium add-monthly-goal-button" onClick={() => setModalShow(true)}>
                                <img src={Plus} alt="icon" />
                                Add new monthly goal
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ultra-card d-flex track-bottom-container">
                <div className="d-flex gap-24 flex-column">
                    <div className="d-flex flex-column gap-24">
                        <h2 className="text-start desktop-heading-level-2 medium">Weight progress tracking</h2>
                        <div className="d-flex flex-column gap-16">
                            <div className="d-flex justify-content-betwen">
                                <h3 className="text-start flex-1 desktop-medium medium color-typography-secondary">Choose workout to see your progress</h3>
                                <div className="d-flex w-fit search-container gap-8 position-relative">
                                    <div className="search bg-white d-flex align-items-center">
                                        <img src={search} alt="" />
                                        <input type="search" className="bg-transparent border-0" placeholder="Search" name="" id="" />
                                    </div>
                                    <button onClick={() => setIsFilterOn(!isFilterOn)} className="border-0 bg-transparent">
                                        {
                                            isFilterOn
                                                ? (<img className="filter" src={filterActive} alt="" />)
                                                : (<img className="filter" src={filter} alt="" />)
                                        }
                                    </button>

                                    {
                                        isFilterOn && <Filter changeFilterState={() => setIsFilterOn(false)} />
                                    }
                                </div>
                            </div>
                            <div className="d-flex flex-wrap gap-8">
                                {
                                    workouts.map((workout, index) => {
                                        return <button key={index} className="border-0 progress-workout-button d-flex align-items-center tag-workout-passive desktop-xtra-small regular color-typography-secondary">{workout}</button>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-18 flex-column">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center flex-1 gap-2">
                                <h4 className="m-0 p-0 desktop-medium medium">
                                    Lateral raise
                                </h4>
                                <div className="d-flex gap-2 w-fit">
                                    <div className="w-fit">
                                        <img src={Increase} alt="" />
                                    </div>
                                    <p className="desktop-regular regular color-typography-additional d-flex align-items-center">
                                        10lb from last workout
                                    </p>
                                </div>
                            </div>

                            <div className="w-fit flex-1 d-flex justify-content-end desktop-regular regular">
                                <p className="color-typography-additional">Oct 31 - Dec 2</p>
                            </div>
                        </div>
                        <MyProgressChart />
                    </div>
                </div>
            </div>

            <AddMonthlyGoal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

        </div>
    )
}

export default Track