function TutorCard({ tutor }) {
  return (
    <div className="tutor-card">
      <h3>{tutor.name}</h3>
      <p>
        <strong>CPF:</strong> {tutor.cpf}
      </p>
      <p>
        <strong>Email:</strong> {tutor.email}
      </p>
      <strong>Endereço:</strong> {tutor.endereco.rua}, {tutor.endereco.number}
      {tutor.endereco.complemento && `, ${tutor.endereco.complemento}`},{" "}
      {tutor.endereco.bairro}, {tutor.endereco.cidade} - {tutor.endereco.estado}
      , CEP: {tutor.endereco.cep}
    </div>
  );
}

export default TutorCard;
