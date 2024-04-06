let participantes = [
  {
    nome: "Miguel Gervasio",
    email: "miguel@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 28),
    dataCheckIn: new Date(2024, 2, 25, 22, 00),
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 15),
    dataCheckIn: new Date(2024, 2, 25, 15, 30),
  },
  {
    nome: "Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 14, 45),
    dataCheckIn: new Date(2024, 2, 25, 18, 45),
  },
  {
    nome: "Carla Sousa",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 8, 30),
    dataCheckIn: new Date(2024, 2, 25, 12, 00),
  },
  {
    nome: "Rui Oliveira",
    email: "rui@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 16, 20),
    dataCheckIn: new Date(2024, 2, 26, 19, 30),
  },
  {
    nome: "Sofia Santos",
    email: "sofia@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 9, 45),
    dataCheckIn: new Date(2024, 2, 27, 14, 10),
  },
  {
    nome: "João Rodrigues",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 11, 55),
    dataCheckIn: new Date(2024, 2, 28, 16, 25),
  },
  {
    nome: "Marta Costa",
    email: "marta@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 13, 40),
    dataCheckIn: new Date(2024, 2, 29, 19, 00),
  },
  {
    nome: "Tiago Ferreira",
    email: "tiago@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 17, 10),
    dataCheckIn: new Date(2024, 2, 30, 21, 50),
  },
  {
    nome: "Inês Santos",
    email: "ines@gmail.com",
    dataInscricao: new Date(2024, 2, 31, 20, 05),
    dataCheckIn: new Date(2024, 3, 1, 11, 20),
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null  
  }

  // verificar se o particpante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email  
  )
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}