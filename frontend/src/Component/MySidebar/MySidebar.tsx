// import React from 'react'
import { Sidebar, Menu, MenuItem, } from "react-pro-sidebar";
import "./MySidebar.css"
import Avatar from '/Icons/avatar.svg'
import Home from "/Icons/Home/home.svg";
import Planner from "/Icons/Planner/planner.svg";
import Library from "/Icons/Library/library.svg";
import Progress from "/Icons/Progress/progress.svg";
import { Link } from 'react-router-dom';


// import "react-pro-sidebar/dist/css/styles.css";


// type Props = {}

const MySidebar = () => {
    return (
        <Sidebar>
            <Menu>
                <MenuItem>
                    <div className='user-profile d-flex flex-column'>
                        <div>
                            <img src={Avatar} alt="" />
                        </div>
                        <h4 className='desktop-xtra-small text-white'>
                            John Walker
                        </h4>
                    </div>
                </MenuItem>
            </Menu>

            <Menu>
                <div className="d-flex flex-column  desktop-side-menu-container">
                    <MenuItem >
                        <Link to="/">
                            <div className="d-flex flex-column gap-2 desktop-side-menu">
                                <div>
                                    <img src={Home} alt="" />
                                </div>
                                <h5 className="desktop-xtra-small medium text-white">Home</h5>
                            </div>
                        </Link>

                    </MenuItem>
                    <MenuItem>
                        <Link to="/planner">
                            <div className="d-flex flex-column gap-2 desktop-side-menu">
                                <div>
                                    <img src={Planner} alt="" />
                                </div>

                                <h5 className="desktop-xtra-small medium text-white">Planner</h5>
                            </div>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/track">
                            <div className="d-flex flex-column gap-2 desktop-side-menu ">
                                <div>
                                    <img src={Progress} alt="" />
                                </div>
                                <h5 className="desktop-xtra-small medium text-white">Progress Tracking</h5>
                            </div>
                        </Link>

                    </MenuItem>
                    <MenuItem>
                        <Link to="/library">
                            <div className="d-flex flex-column gap-2 desktop-side-menu">
                                <div>
                                    <img src={Library} alt="" />
                                </div>
                                <h5 className="desktop-xtra-small medium text-white">Library</h5>
                            </div>
                        </Link>

                    </MenuItem>
                </div>

            </Menu>

        </Sidebar>
    )
}

export default MySidebar