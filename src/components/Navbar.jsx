import { Link } from 'react-router-dom';
import logoGif from '../assets/logo.gif'; // Import the GIF

export const Navbar = () => {
  return (
    <nav className="navbar flex justify-between items-center p-4 text-white">
      <div className="navbar-start">
        <img src={logoGif} width="40px" alt="Logo" />
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal">
          <li><Link to="/" className="hover:text-blue-400 mr-4">Homepage</Link></li>
          <li><Link to="/restaurants" className="hover:text-blue-400">Restaurant</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal">
          <li>
            <Link to="/login" className='hover:text-blue-400'>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
