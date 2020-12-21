import { useState } from 'react'
import NProgress from 'nprogress'
import { APP_NAME} from '../config'
import Link from 'next/link'
import  Router from 'next/router';
import {signout, isAuth} from '../actions/auth'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import Search from './blog/Search';


Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
          <Navbar color="light" light expand="md">
            <Link href='/'>
              <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar >
              <Nav className="ml-auto" navbar>

                    <NavItem>
                      <Link href='/blogs'>
                        <NavLink>
                          Blogs
                        </NavLink>
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link href='/contact'>
                        <NavLink>
                          Contact
                        </NavLink>
                      </Link>
                    </NavItem>
                {!isAuth() && (
                  <>
                    <NavItem>
                      <Link href='/signin'>
                        <NavLink>
                          Sigin
                        </NavLink>
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link href='/signup'>
                        <NavLink>
                          Signup
                        </NavLink>
                      </Link>
                    </NavItem>
                  </>
                )}
                
                

                {isAuth() && isAuth().role === 0 && (
                  <NavItem>
                    <Link href='/user'>
                      <NavLink>
                        {`${isAuth().name}'s Dashboard`}
                      </NavLink>
                    </Link>
                </NavItem>
                )}

                {isAuth() && isAuth().role === 1 && (
                  <NavItem>
                    <Link href='/admin'>
                      <NavLink>
                        {`${isAuth().name}'s Dashboard`}
                      </NavLink>
                    </Link>
                </NavItem>
                )}

                {isAuth() && (
                  <NavItem>
                    <NavLink style={{cursor: 'pointer'}} onClick={() => signout(() => Router.replace(`/signin`))}>
                      Signout
                    </NavLink>
                </NavItem>
                )}
                 <NavItem>
                      <Link href='/user/crud/blog'>
                        <NavLink className='btn btn-primary text-light'>
                          Write a Blog
                        </NavLink>
                      </Link>
                  </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Search />
        </>
      ); 
}

export default Header