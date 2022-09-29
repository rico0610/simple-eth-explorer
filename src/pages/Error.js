import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

function Error() {
  return (
    <Container>
        <Row className="mt-5">
            <Col>
                <img className="mt-5" style={{width: "30%"}} src='https://cdn.pixabay.com/photo/2021/07/25/08/10/alert-6491216_960_720.png' alt="error-img"></img>
                <h1 className="mt-5">Search not found. Reload the Page.</h1>
            </Col>
        </Row>
    </Container>
  )
}
export default Error