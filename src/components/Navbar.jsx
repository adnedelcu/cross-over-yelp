import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <Link to="/">Homepage</Link>
      <Link to="/restaurants">Restaurant</Link>
    </nav>
  )
}
