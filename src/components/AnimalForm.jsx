import React, { useState } from "react";
import axios from "axios";

function AnimalForm({ addAnimal, tutors }) {
  const [formData, setFormData] = useState({
    tutorId: "",
    nome: "",
    dataNascimento: "",
    especie: "",
    raca: "",
    peso: "",
    porte: "",
    pelagem: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cadastro = Date.now();
      const newAnimalData = {
        ...formData,
        cadastro,
        tutor_id: Number(formData.tutorId),
      };

      const response = await axios.post(
        "http://localhost:5000/api/animais",
        newAnimalData
      );
      addAnimal(response.data);

      setFormData({
        tutorId: "",
        nome: "",
        dataNascimento: "",
        especie: "",
        raca: "",
        peso: "",
        porte: "",
        pelagem: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="tutorId">Tutor:</label>
        <select
          nome="tutorId"
          id="tutorId"
          value={formData.tutor_id}
          onChange={handleChange}
        >
          <option value="">Selecione um tutor</option>
          {tutors.map((tutor) => (
            <option key={tutor.id} value={tutor.id}>
              {tutor.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="name">Nome do Animal:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dataNascimento">Data de Nascimento:</label>
        <input
          type="date"
          id="dataNascimento"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="especie">Espécie:</label>
        <input
          type="text"
          id="especie"
          name="especie"
          value={formData.especie}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="raca">Raça:</label>
        <input
          type="text"
          id="raca"
          name="raca"
          value={formData.raca}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="peso">Peso:</label>
        <input
          type="number"
          id="peso"
          name="peso"
          value={formData.peso}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="porte">Porte:</label>
        <input
          type="text"
          id="porte"
          name="porte"
          value={formData.porte}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="pelagem">Pelagem:</label>
        <input
          type="text"
          id="pelagem"
          name="pelagem"
          value={formData.pelagem}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Adicionar Animal</button>
    </form>
  );
}

export default AnimalForm;
