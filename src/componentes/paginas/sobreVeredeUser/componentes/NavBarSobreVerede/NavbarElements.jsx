import styled from 'styled-components'
import { Link as LinkR} from 'react-router-dom'
import { Link as LinkS}from 'react-scroll'
import '../../../registro-InicioSesion/componentes/formularios/Formularios.scss'

export const Nav = styled.nav`
  background: #2c2a2a37;
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content:center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  font-family: var(--font-family);
  font-weight:bold ;
  color: white;

  :hover {
    color: #CE972B ;
  }

  @media screen and (max-width: 960px) {
    transtion: 0.8s all ease
  }
`
export const NavbarContainer = styled.div`
  display: flex;
  justify-content:space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  /* max-width:1100px; */
  max-width: 1383px;
  @media screen and (max-width:768px){
    justify-content: flex-start;
  }
`
export const ArrowHome = styled(LinkR) `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    cursor:pointer

    :hover {
      color: #CE972B;
    }
`

export const NavLogo = styled(LinkR)`
  color: #CE972B;
  justify-self:space-around;
  cursor:pointer;
  font-size: 1.2rem;
  display:flex;
  align-items: center;
  margin-left: 24px;
  font-weight:bold;
  text-decoration: none;
`

export const MobileIcon = styled.nav`
  display:none;
  @media screen and (max-width:768px){
    display: block;
    position: absolute;
    top:0;
    right:0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #000000;
  }
`

export const NavMenu =styled.nav`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width:768px){
    display:none;    
  }
`

export const NavItem =styled.li`
height: 80px;
`

export const NavLinks = styled(LinkS)`
  color: #ffff ;
  display: flex;
  align-items:center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  :hover {
    /* border-bottom: 3px solid #CE972B; */
    color:  #CE972B;
  }
`
export const NavBtn =styled.nav`
  display:flex;
  align-items: center;
  @media screen and (max-width:768px){
    display:none;    
  }
`
export const NavBtnLink =styled(LinkR)`
  border-radius: 8px;
  background: #CE972B;
  white-space:nowrap;
  padding: 13px 36px;
  color: #ffff;
  font-size: 16px;
  outline:none;
  border:none;
  cursor:pointer;
  transition: all 0.2s ease-in-out;
  text-decoration:none;
  :hover {
    transition: all 0.2s ease-in-out;
    background:#ffff ;
    color:#CE972B ;
  }
`



