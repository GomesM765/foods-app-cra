import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Container, Row, Card } from 'react-bootstrap';

//import foods from '../models/foods';
import Food from './Food';
import FoodForm from './FoodForm';

import Cliente from './Cliente';
import ClienteForm from './ClienteForm';

const Main = () => {
  let [foods, setFoods] = useState([]);
  let [clientes, setClientes] = useState([]);


  let [nome, setNome] = useState('');

  //botao de preparação
  const [showFoodModal, setShowFoodModal] = useState(false);

  const handleCloseFoodModal = () => setShowFoodModal(false);
  const handleShowFoodModal = () => setShowFoodModal(true);

  //botao de cliente
  const [showClienteModal, setShowClienteModal] = useState(false);

  const handleCloseClienteModal = () => setShowClienteModal(false);
  const handleShowClienteModal = () => setShowClienteModal(true);


  let buttonAdd = useRef(null);

  async function getComidas() {
    const response = await fetch('http://localhost:4000/comidas', {
      method: 'GET',
    }); //A função assíncrona getComidas é definida para fazer uma requisição GET para o servidor em http://localhost:4000/comidas e retornar os dados recebidos.
    const data = await response.json();

    return data;
  }

  const handleClick = async (event) => {
    console.log('Antes do fecth');
    const data = await getComidas();
    console.log(data);
    console.log('Depois do fetch!');
  };
// listagem de foods
  useEffect(() => {
    fetch('http://localhost:4000/foods')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoods([...data]);
      })
      .catch();
  }, []);
// listagem de clientes 
  useEffect(() => {
    fetch('http://localhost:4000/clientes')
      .then((response) => {
        return response.json();
      }) //usado para indewntificação de erro
      .then((data) => {
        setClientes([...data]);
      }) // o erro cai no catch
      .catch();
  }, []);

  const nomeHandleChange = (event) => {
    setNome(event.target.value);
  };


  return (
    <main>

      <Container>
        <h1>Menu</h1>
        <div className="text-right">
          <Button
            variant="secondary"
            className="mr-4 font-weight-bold"
            onClick={handleShowFoodModal}
            ref={buttonAdd}
            style={{ marginRight: 10 }}
          >
            + | Adicionar Preparação
          </Button>
          {/** Há dois botões na parte superior direita, da tela principal um para adicionar preparação e outro para adicionar cliente. Quando esses botões são clicados, os modais correspondentes são abertos. */}

                 
 {/**o modal handleShowClienteModal que é aberto ao ser clicado no botão */}
          <Button
            variant="secondary"
            className="mr-4 font-weight-bold"
            onClick={handleShowClienteModal} 
            ref={buttonAdd}
          >
            + | Adicionar Cliente
          </Button>
        </div>


        {/* Component Button do bootstrap. */}
        <Form.Group className="mb-3">
          <Form.Label>Alimento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Café"
            value={nome}
            onChange={nomeHandleChange}
          />
        </Form.Group>

        <Button onClick={handleClick} variant="primary">
          Pesquisar
          {/** esse botão "Pesquisar" que chama a função handleClick quando clicado. */}
        </Button>

        <Card style={{marginTop: 30}}>
          <Card.Header className="text-center font-weight-bold bg-primary" style={{ color: 'white' }}>
            Área do cardápio
          </Card.Header>
        </Card>

        <Row className="my-2">
          {foods.map((food) => (
            <Food key={food.id} food={food}></Food>
          ))}
        </Row>

{/**o FoodForm, que é um modal para adicionar preparação. Ele recebe os estados foods e setFoods como propriedades. */}

{/** HandleCloseFoodModal usado para fechar o modal */}
        <FoodForm 
          show={showFoodModal}
          handleClose={handleCloseFoodModal}
          foods={foods}
          setFoods={setFoods}
        >
        </FoodForm>

        <Card>
          <Card.Header className="text-center font-weight-bold bg-primary" style={{ color: 'white' }}>
            Área de Clientes
          </Card.Header>
        </Card>

        <Row className="my-2">
          {clientes.map((cliente) => (
            <Cliente key={cliente.id} cliente={cliente}></Cliente>
          ))}
        </Row>

        <ClienteForm
          show={showClienteModal}
          handleClose={handleCloseClienteModal}
          clientes={clientes}
          setClientes={setClientes}
        >
        </ClienteForm>
      </Container>
    </main>
  );
};

export default Main;
