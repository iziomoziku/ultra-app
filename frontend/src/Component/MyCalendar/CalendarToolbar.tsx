
import chevronLeft from '/Icons/chevron-left.svg'
import chevronRight from '/Icons/chevron-right.svg'
import filter from '/Icons/Filter/filter.svg'
import filterActive from '/Icons/Filter/filter-active.svg'
import { useState } from 'react';
import Filter from './Filter'


const CustomToolbar = (toolbar: any) => {

    const [isFilterOn, setIsFilterOn] = useState(false)



    return (
        <div className="custom-toolbar d-flex justify-content-between align-items-center">
            <h4 className="flex-1 text-start m-0 p-0">{toolbar.label}</h4>
            <div className='w-fit d-flex justify-content-end' >
                <div className=" w-fit d-flex justify-content-end toolbar-month-navigation">
                    <button
                        className="toolbar-arrow-left toolbar-arrow toolbar-button p-0 border-0 bg-transparent"
                        onClick={() => toolbar.onNavigate("PREV")}
                    >
                        <img src={chevronLeft} alt="icon" />

                    </button>
                    <button
                        className="toolbar-arrow-right toolbar-button toolbar-arrow p-0 border-0 bg-transparent"
                        onClick={() => toolbar.onNavigate("NEXT")}
                    >
                        <img src={chevronRight} alt="icon" />

                    </button>
                </div>

                <div className='w-fit filter-container position-relative'>
                    {
                        isFilterOn
                            ? (<img src={filterActive} alt="" onClick={() => setIsFilterOn(!isFilterOn)} />)
                            : (<img src={filter} alt="" onClick={() => setIsFilterOn(!isFilterOn)} />)
                    }

                    {
                        isFilterOn && <Filter changeFilterState={() => setIsFilterOn(false)} />
                    }

                </div>

            </div>

        </div>
    );
};

export default CustomToolbar;
