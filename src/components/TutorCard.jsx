import React from "react";

function TutorCard({ tutor, onEdit, onDelete }) {
  return (
    <div className="tutor-card">
      <h3>{tutor.name}</h3>
      <p>
        <strong>CPF:</strong> {tutor.cpf}
      </p>
      <p>
        <strong>Email:</strong> {tutor.email}
      </p>
      {/* <strong>Endereço:</strong> {tutor.rua}, {tutor.number}
      {tutor.complemento && `, ${tutor.complemento}`}, {tutor.bairro},{" "}
      {tutor.cidade} - {tutor.estado}, CEP: {tutor.cep}
      <button onClick={() => onEdit(tutor)}>Editar</button>
      <button onClick={() => onDelete(tutor.id)}>Excluir</button> */}
      <strong>Endereço:</strong> {tutor.endereco.rua}, {tutor.endereco.number}
      {tutor.endereco.complemento && `, ${tutor.endereco.complemento}`},{" "}
      {tutor.endereco.bairro}, {tutor.endereco.cidade} - {tutor.endereco.estado}
      , CEP: {tutor.endereco.cep}
      <button onClick={() => onEdit(tutor)}>Editar</button>
      <button onClick={() => onDelete(tutor.id)}>Excluir</button>
    </div>
  );
}

export default TutorCard;
