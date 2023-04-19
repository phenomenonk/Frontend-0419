import React from "react";
import "./Navbar.css";
import { AiOutlineUser, AiOutlineSearch, AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  function handleCommunity() {
    navigate("/Community");
  }

  return (
    <div className='Navbar'>
      <Link to='/'>
        <img
          onClick={handleClick}
          className='Logo_Image'
          src='logo.png'
          alt='Logo'
        ></img>
      </Link>

      <div className='Navbar_Container'>
        <div className='Navbar_Service'>
          <span className='Navbar_Course'> 여행코스</span>
          <span className='Navbar_Friend'> 친구매칭</span>
          <span className='Navbar_Mission'> 미션</span>
          <span className='Navbar_Community' onClick={handleCommunity}>
            {" "}
            커뮤니티
          </span>
        </div>
        <div className='Navbar_Option'>
          <AiOutlineUser className='Navbar_UserIcon' />
          <AiOutlineSearch className='Navbar_SearchIcon' />
          <AiFillHeart className='Navbar_HeartIcon' />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
