import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AnimalCard from "../components/AnimalCard";
import AnimalForm from "../components/AnimalForm";
import AnimalEditForm from "../components/AnimalEditForm";
import Modal from "../components/Modal";
import Layout from "../templates/Layout";

function ListagemAnimais() {
  const [animals, setAnimals] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAnimal, setEditAnimal] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/animais")
      .then((response) => {
        setAnimals(response.data);
      })
      .catch((error) => console.error("Erro ao buscar animais:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tutores")
      .then((response) => {
        setTutors(response.data);
      })
      .catch((error) => console.error("Erro ao buscar tutores:", error));
  }, []);

  const addAnimal = async (newAnimal) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/animais",
        newAnimal
      );
      setAnimals([...animals, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
    }
  };

  const updateAnimal = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/animais/${editAnimal.id}`,
        updatedData
      );
      const updatedAnimal = response.data;
      setAnimals(
        animals.map((a) => (a.id === updatedAnimal.id ? updatedAnimal : a))
      );
      setEditAnimal(null);
    } catch (error) {
      console.error("Erro ao atualizar animal:", error);
    }
  };

  const deleteAnimal = async (animalId) => {
    try {
      await axios.delete(`http://localhost:5000/api/animais/${animalId}`);
      setAnimals(animals.filter((a) => a.id !== animalId));
    } catch (error) {
      console.error("Erro ao excluir animal:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h2>Animais cadastrados</h2>
        <div>
          {animals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onEdit={(a) => setEditAnimal(a)}
              onDelete={deleteAnimal}
            />
          ))}
        </div>
        <button onClick={() => setIsModalOpen(true)}>Cadastro de Animal</button>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Cadastro de Animal</h2>
          <AnimalForm addAnimal={addAnimal} tutors={tutors} />
        </Modal>
        <Modal isOpen={!!editAnimal} onClose={() => setEditAnimal(null)}>
          <h2>Edição de Animal</h2>
          {editAnimal && (
            <AnimalEditForm
              animal={editAnimal}
              tutors={tutors}
              onConfirm={updateAnimal}
              onCancel={() => setEditAnimal(null)}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
}

export default ListagemAnimais;
