import React from 'react';
import {BiMenuAltRight} from 'react-icons/bi';
import {Nav, NavbarContainer, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './NavbarElements'
import { Link } from 'react-scroll';


function Navbar({toggle}) {

  const navLinks = [
    { to: "infoSection", children: "¿Quienes somos?" },
    { to: "productosSection", children: "Productos" },
    { to: "serviciosSection", children: "Servicios" },
    { to: "reconocimientoSection", children: "Reconocimiento" },
    { to: "sucursalesSection", children: "Sucursales" },
  ];
  return (
    <>
      <Nav>
        <NavbarContainer>
          <MobileIcon onClick={toggle}>
            <BiMenuAltRight />
          </MobileIcon>
          <NavMenu>
            {navLinks.map((navLink) => (
              <NavItem key={navLink.to}>
                <NavLinks {...navLink} spy={true} smooth={true} offset={50} duration={500}>
                  {navLink.children}
                </NavLinks>
              </NavItem>
            ))}
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
