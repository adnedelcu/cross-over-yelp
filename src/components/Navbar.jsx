import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 text-white">
      <div className="ml-24">
        <Link to="/" className="hover:text-blue-400 mr-4">Homepage</Link>
        <Link to="/restaurants" className="hover:text-blue-400">Restaurant</Link>
      </div>
    </nav>
  );
}
