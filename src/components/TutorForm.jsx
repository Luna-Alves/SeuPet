import React, { useState } from "react";
import axios from "axios";

function TutorForm({ addTutor }) {
  const [formData, setFormData] = useState({
    nome: "",
    documento: "",
    email: "",
    endereco: {
      estado: "",
      cep: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      complemento: "",
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tutores",
        formData
      );
      addTutor(response.data);
      setFormData({
        nome: "",
        documento: "",
        email: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        pais: "",
        cep: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar tutor:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="documento">Documento:</label>
        <input
          type="text"
          id="documento"
          name="documento"
          value={formData.documento}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <fieldset>
        <legend>Endereço</legend>
        <div>
          <label htmlFor="rua">Rua:</label>
          <input
            type="text"
            id="rua"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="numero">Número:</label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="complemento">Complemento:</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bairro">Bairro:</label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
          />
        </div>
      </fieldset>
      <button type="submit">Adicionar Tutor</button>
    </form>
  );
}

export default TutorForm;
