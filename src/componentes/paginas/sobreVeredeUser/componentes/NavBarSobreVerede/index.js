import React, { useRef } from 'react';
import {BiMenuAltRight , BiArrowBack} from 'react-icons/bi';
import {Nav, NavbarContainer, /* NavLogo, */ MobileIcon, NavMenu, NavItem, NavLinks , ArrowHome} from './NavbarElements'


function Navbar({toggle}) {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <ArrowHome to='/Productos'>
            <BiArrowBack/>
          </ArrowHome>
{/*           <NavLogo to='/Productos'>
            Compra Aquí
          </NavLogo> */}
          <MobileIcon onClick={toggle}>
            <BiMenuAltRight />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="about" href="#infoSection" >¿Quienes somos?</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="productos" href="#productosSection">Productos</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="servicios" href="#serviciosSection" >Servicios</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="testimonios" href="#reconocimientoSection">Reconocimiento</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="sucursales" href="#sucursalesSection" >Sucursales</NavLinks>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar
