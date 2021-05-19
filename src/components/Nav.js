import React from 'react';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';
import './Nav.css';

function Nav() {
    return (
        <div className='Nav'>
            <div className="nav-content">
                <Link to='/'><MenuBookIcon color='secondary' /></Link>
                <LogOut />
            </div>
        </div>
    )
}
export default React.memo(Nav);