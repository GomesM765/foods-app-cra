import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Container, Row } from 'react-bootstrap';
import ClienteForm from './ClienteForm';

//import foods from '../models/foods';
import Food from './Food';
import FoodForm from './FoodForm';

const Main = () => {
  let [foods, setFoods] = useState([]);

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
    });
    const data = await response.json();

    return data;
  }

  const handleClick = async (event) => {
    console.log('Antes do fecth');
    const data = await getComidas();
    console.log(data);
    console.log('Depois do fetch!');
  };

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
          >
            + | Adicionar Preparação
          </Button>
        

      
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
        </Button>

        <Row className="my-2">
          {foods.map((food) => (
            <Food key={food.id} food={food}></Food>
          ))}
        </Row>

        <FoodForm
          show={showFoodModal}
          handleClose={handleCloseFoodModal}
          foods={foods}
          setFoods={setFoods}
        ></FoodForm>
        <ClienteForm>
          show={showClienteModal}
          handleClose={handleCloseClienteModal}
          foods={foods}
          setFoods={setFoods}
        </ClienteForm>
      </Container>
    </main>
  );
};

export default Main;
