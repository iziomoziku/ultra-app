
import { currentPlans, routines, workouts } from '../../data'
import filter from '/Icons/Filter/filter.svg'
import close from '/Icons/close.svg'
// import filterActive from '/Icons/Filter/filter-active.svg'

type Props = {
    changeFilterState: () => void
}

const Filter = ({ changeFilterState }: Props) => {



    return (
        <div className='position-absolute sort-calendar'>

            <div className='d-flex flex-column gap-16'>
                <div className='d-flex align-items-start justify-content-between'>
                    <h5 className='m-0 p-0 desktop-medium medium text-start d-flex align-items-start color-typography-medium flex-1'>Sort by:</h5>
                    <button className='border-0 bg-transparent m-0 p-0'>
                        <img src={close} alt="" onClick={changeFilterState} />
                    </button>
                </div>
                <div className='d-flex flex-column gap-16'>
                    <div className='sorting-plans-container d-flex flex-column'>
                        <h6 className='text-start desktop-small medium color-typography-secondary m-0'>Plans</h6>
                        <div className='d-flex gap-2 flex-wrap'>
                            {
                                currentPlans.map((plan, index) => {
                                    return <button key={index} className='border-0 justify-content-center d-flex desktop-xtra-small regular tag-plan-passive'>{plan.name}</button>
                                })
                            }
                        </div>
                    </div>
                    <div className='sorting-plans-container d-flex flex-column'>
                        <h6 className='text-start desktop-small medium color-typography-secondary m-0'>Routines</h6>
                        <div className='d-flex gap-2 flex-wrap'>
                            {
                                routines.map((routine, index) => {
                                    return <button key={index} className='border-0 justify-content-center d-flex desktop-xtra-small regular tag-routine-passive'>{routine}</button>
                                })
                            }
                        </div>
                    </div>
                    <div className='sorting-plans-container d-flex flex-column'>
                        <h6 className='text-start desktop-small medium color-typography-secondary m-0'>Workouts</h6>
                        <div className='d-flex gap-2 flex-wrap'>
                            {
                                workouts.map((workout, index) => {
                                    return <button key={index} className='border-0 justify-content-center d-flex desktop-xtra-small regular tag-workout-passive'>{workout}</button>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <button className='border-0 bg-white d-flex w-100 align-items-center justify-content-center sort-button'>
                <img src={filter} alt="" />
                Sort
            </button>
        </div>
    )
}

export default Filter