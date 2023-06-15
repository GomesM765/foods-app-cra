import React from 'react';

import { Col, Card } from 'react-bootstrap';

const Cliente = ({ cliente }) => {
  return (
    <Col sm="12" md="6" lg="4" xl="3">
      <Card>
        <Card.Header className="text-center font-weight-bold bg-primary" style={{ color: 'white' }}>
          {cliente.name}
        </Card.Header>

        <Card.Body className="p-0">
            <Card.Text className="p-2">Nome: {cliente.name}</Card.Text>
            <Card.Text className="p-2">Email: {cliente.email}</Card.Text>
            <Card.Text className="p-2">Nascimento: {cliente.nascimento}</Card.Text>
            <Card.Text className="p-2">CEP: {cliente.cep}</Card.Text>
        </Card.Body>

        <Card.Body className="p-0"></Card.Body>
      </Card>
    </Col>
  );
};

export default Cliente;