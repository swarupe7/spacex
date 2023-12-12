import React from 'react';
import './navb.css';

const Navbar = () => {
  return (
    <>
    <nav className="navbar bg-dark">
        <div className="container-fluid" style={{ display: "flex", justifyContent: "space-between",alignItems: "center" }}>
            <a className="navbar-brand text-light" href="/">
              <b> <h1> SpaceX </h1>  </b>
            </a>
            <ul className="nav-ul">
                <li><a href="/" style={{"color":"white",   "text-decoration": "none"}}>Home</a></li>
                <li><a href="/analytics" style={{"color":"white",    "text-decoration": "none"  }}>Analytics</a></li>
            </ul>
        </div>
    </nav>
    
    </>
  )
}

export default Navbar