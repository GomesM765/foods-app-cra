import React, { useState } from 'react'; //usado para importação 
// do pacote 'react' para permitir a criação de componentes React.

//useEffect, useRef e useState são importados do pacote 'react' para //usar Hooks React.//
import { Button, Form, Modal } from 'react-bootstrap';
 // importação dos botoes, do fomrulario e do modal usado no formuladio do cliente que saoimportados do bootstrap react
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
    fetch('http://localhost:4000/clientes', { // é uma função assíncrona que faz uma requisição GET para getclientes e retorna em formato de Json
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
      }) // catch usado para indentificação de erro
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
              required //O atributo booleano required , se presente, indica que o usuário deve especificar um valor para a entrada antes que o formulário proprietário possa ser enviado.
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