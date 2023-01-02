import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import { TiShoppingCart } from 'react-icons/ti';
import {
  FaShoppingBag,
  FaPowerOff,
  FaHistory,
  FaBoxes,
  FaStoreAlt,
  FaUser,
  FaUsers,
} from 'react-icons/fa';
import { CgMenuLeft } from 'react-icons/cg';
import { GiCancel } from 'react-icons/gi';
import { IoMdLogIn } from 'react-icons/io';
import { Link } from 'react-router-dom';

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  // The section of the logout user
  const logoutUser = async () => {
    localStorage.clear();

    window.location.href = '/';
  };

  // The section of the admin router
  const adminRouter = () => {
    return (
      <>
        <li>
          <FaStoreAlt className='nav-icon' />
          <Link to='/create_product'>Create Product</Link>
        </li>

        <li>
          <FaUsers className='nav-icon' />
          <Link to='/users'>Users</Link>
        </li>

        <li>
          <FaBoxes className='nav-icon' />
          <Link to='/category'>Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <FaHistory className='nav-icon' />
          <Link to='/history'>History</Link>
        </li>
        <li>
          <FaUser className='nav-icon' />
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <FaPowerOff className='nav-icon' />
          <Link to='/' onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : '-100%',
  };

  return (
    <header>
      <div className='menu' onClick={() => setMenu(!menu)}>
        <CgMenuLeft />
      </div>

      <div className='logo'>
        <h1>
          <Link to='/'>{isAdmin ? 'Admin' : 'Mamazee wears'}</Link>
        </h1>
      </div>

      <ul style={styleMenu} onClick={() => setMenu(!menu)}>
        <li>
          <FaShoppingBag className='nav-icon' />
          <Link to='/'>{isAdmin ? 'Products' : 'Products'}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <IoMdLogIn className='nav-icon' />
            <Link to='/login'>Login</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <GiCancel className='menu' />
        </li>
      </ul>

      {isAdmin ? (
        ''
      ) : (
        <div className='cart-icon'>
          <span>{cart.length}</span>
          <Link to='/cart'>
            <TiShoppingCart />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
