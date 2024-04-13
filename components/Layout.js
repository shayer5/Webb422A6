// components/Layout.js
import MainNav from './MainNav';
import { Container } from 'react-bootstrap';

const Layout = (props) => (
  <>
    <MainNav />
    <br />
    <Container>
      {props.children}
    </Container>
    <br />
  </>
);
export default Layout;
