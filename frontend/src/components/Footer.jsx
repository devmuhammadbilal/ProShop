import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-4 mt-auto">
      <Container>
        <Row>
          <Col className='text-center'>
            <p className="mb-0 text-muted">ProShop &copy; {currentYear}. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;