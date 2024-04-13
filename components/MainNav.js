import { Navbar, Nav, Form, FormControl, Button, NavDropdown, Container } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

const MainNav = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const token = readToken();

  const handleLogout = () => {
    setExpanded(false);
    removeToken();
    router.push('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    const updateHistory = await addToHistory(`title=true&q=${searchTerm}`);
    setSearchHistory(updateHistory);
    router.push(`/search?title=true&q=${searchTerm}`);
    setExpanded(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Brand as="span" onClick={() => setExpanded(false)}>Sukhman Hayer</Navbar.Brand>
          <Navbar.Toggle onClick={() => setExpanded(exp => !exp)} aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref><Nav.Link onClick={() => setExpanded(false)}>Home</Nav.Link></Link>
              {token && <Link href="/search" passHref><Nav.Link onClick={() => setExpanded(false)}>Advanced Search</Nav.Link></Link>}
            </Nav>
            {token ? (
              <>
                <Form className="d-flex" onSubmit={handleSearch}>
                  <FormControl type="text" placeholder="Search" className="me-2" name="search" />
                  <Button type="submit" variant="outline-light">Search</Button>
                </Form>
                <NavDropdown title={token.userName || "User Name"} id="collapsible-nav-dropdown">
                  <NavDropdown.Item onClick={() => {handleLogout(); setExpanded(false);}}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav>
                <Link href="/login" passHref><Nav.Link onClick={() => setExpanded(false)}>Login</Nav.Link></Link>
                <Link href="/register" passHref><Nav.Link onClick={() => setExpanded(false)}>Register</Nav.Link></Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
