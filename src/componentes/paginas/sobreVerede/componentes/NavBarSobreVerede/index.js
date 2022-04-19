import React from 'react';
import {BiMenuAltRight, BiArrowBack} from 'react-icons/bi';
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, ArrowHome, NavBtn, NavBtnLink} from './NavbarElements'


function Navbar({toggle}) {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <ArrowHome to='/Home'>
            <BiArrowBack/>
          </ArrowHome>
          <NavLogo to='/Home'>
            Sobre Veridé
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <BiMenuAltRight />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="about" href="#infoSection">¿Quienes somos?</NavLinks>
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
          <NavBtn>
            <NavBtnLink to="/Inicio-Sesion" >Ingresa Aquí</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar
