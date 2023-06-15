import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const ClienteForm = ({ show, handleClose, clientes, setClientes }) => {

  let [cliente, setClienteForm] = useState({
    name: '',
    email: '',
    nascimento: '',
    cep: '',
  });

  const handleChange = (event) => {
    setClienteForm({ ...cliente, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    // Enviar os dados para o servidor backend.
    fetch('http://localhost:4000/clientes', {
      method: 'POST', // Método de envio.
      body: JSON.stringify(cliente), // Converte o Json em string
      headers: {
        'Content-Type': 'application/json', // Especifica o tipo do conteúdo da requisição.
      },
    })
      .then((response) => {
        if (response.ok === true) {
          // Fechar modal.
          handleClose();
          return response.json();
        }
      })
      .then((data) => {
        setClientes([...clientes, data]);
      })
      .catch((error) => {});
    // Atualizar a lista dos itens do cardápio.
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Cliente</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleOnSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Data de Nascimento"
              name="nascimento"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              type="text"
              placeholder="CEP"
              name="cep"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button type="submit" variant="primary">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ClienteForm;