import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="flex justify-center items-center p-4 text-white">
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">Homepage</Link>
        <Link to="/restaurants" className="hover:text-blue-400">Restaurant</Link>
      </div>
    </nav>
  );
}
