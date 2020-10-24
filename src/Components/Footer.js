import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Footer = (props) => {
  return (
    <footer>
      <Container>
        <Row className="text-center py-3">
          <Col>copyright</Col>
        </Row>
      </Container>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
