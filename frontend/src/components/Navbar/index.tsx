import React from 'react'
import logo from './marche-health-logo.svg'
import * as $ from './styles'
 
const Navbar: React.FC = () => {
  return <$.NavbarContainer>
    <img src={logo} height={50} />
  </$.NavbarContainer>
}

export default Navbar
