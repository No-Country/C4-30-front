import React from 'react';
import {BiMenuAltRight, BiArrowBack} from 'react-icons/bi'
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, ArrowHome, NavBtn, NavBtnLink} from './NavbarElements'


function Navbar() {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <ArrowHome>
            <BiArrowBack />
          </ArrowHome>
          <NavLogo to='/'>
            Sobre Veredé
          </NavLogo>
          <MobileIcon>
            <BiMenuAltRight />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="about" >¿Quienes somos?</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="about" >Servicios</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="about" >Testimonios</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="about" >Sucursales</NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/Home">Ingresa Aquí</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  )
}

export default Navbar