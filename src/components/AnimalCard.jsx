import React from "react";

function AnimalCard({ animal, onEdit, onDelete }) {
  return (
    <div className="tutor-card">
      <h3>{animal.nome}</h3>
      <p>
        <strong>Tutor:</strong> {animal.tutor?.nome || "N/A"}
      </p>
      <p>
        <strong>Data de Nascimento:</strong> {animal.dataNascimento}
      </p>
      <p>
        <strong>Espécie:</strong> {animal.especie}
      </p>
      <p>
        <strong>Raça:</strong> {animal.raca}
      </p>
      <p>
        <strong>Peso:</strong> {animal.peso}
      </p>
      <p>
        <strong>Porte:</strong> {animal.porte}
      </p>
      <p>
        <strong>Pelagem:</strong> {animal.pelagem}
      </p>
      <p>
        <strong>Cadastro:</strong> {animal.cadastro}
      </p>
      <button onClick={() => onEdit(animal)}>Editar</button>
      <button onClick={() => onDelete(animal.id)}>Excluir</button>
    </div>
  );
}

export default AnimalCard;
