import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TutorCard from "../components/TutorCard";
import TutorForm from "../components/TutorForm";
import TutorEditForm from "../components/TutorEditForm";
import Modal from "../components/Modal";
import Layout from "../templates/Layout";
import initialTutors from "../datasets/tutors";

function ListagemTutor() {
  const [tutors, setTutors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTutor, setEditTutor] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tutores")
      .then((response) => {
        setTutors(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar tutores:", error);
      });
    setTutors(initialTutors);
  }, []);

  const addTutor = async (newTutor) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tutores",
        newTutor
      );
      setTutors([...tutors, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar tutor", error);
    }
  };

  const updateTutor = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tutores/${editTutor.id}`,
        updatedData
      );
      const updatedTutor = response.data;
      setTutors(
        tutors.map((t) => (t.id === updatedTutor.id ? updatedTutor : t))
      );
      setEditTutor(null);
    } catch (error) {
      console.error("Erro ao atualizar tutor:", error);
    }
  };

  const deleteTutor = async (tutorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tutores/${tutorId}`);
      setTutors(tutors.filter((t) => t.id !== tutorId));
    } catch (error) {
      console.error("Erro ao excluir tutor:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h2>Tutores Cadastrados</h2>
        <div>
          {tutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onEdit={(t) => setEditTutor(t)}
              onDelete={deleteTutor}
            />
          ))}
        </div>
        <button onClick={() => setIsModalOpen(true)}>Cadastro de Tutor</button>
        <Link to="/">
          <button>Home</button>
        </Link>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Cadastro de Tutor</h2>
          <TutorForm addTutor={addTutor} />
        </Modal>

        <Modal isOpen={!!editTutor} onClose={() => setEditTutor(null)}>
          <h2>Edição de Tutor</h2>
          {editTutor && (
            <TutorEditForm
              tutor={editTutor}
              onConfirm={updateTutor}
              onCancel={() => setEditTutor(null)}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
}

export default ListagemTutor;
