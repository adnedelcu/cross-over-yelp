import { useParams } from 'react-router-dom'
import { Navbar } from './Navbar.jsx'

export const Restaurant = () => {
  let { id } = useParams();

  return (
    <>
      <Navbar></Navbar>
      Restaurant #{id}
    </>
  )
}
