// object {}
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-09 10:00"),
    finalizada: true
}

// lista, array, vetor [0, 1, 2]
const atividades = [
    atividade,
    {
        nome: 'Academia em grupo',
        data: new Date("2024-07-09 12:00"),
        finalizada: false
    },
    {
        nome: 'Gamming session',
        data: new Date("2024-07-09 15:00"),
        finalizada: true
    }
]

// arrow function
const criarItemAtividade = (atividade) => {
    let input = '<input type="checkbox" '

    if(atividade.finalizada) {
       input += 'checked' 
    }

    input += '>'

    return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>${atividade.data}</time>
    </div>
    `
}

const section = document.querySelector('section');

for(let atividade of atividades) {
    section.innerHTML += criarItemAtividade(atividade);
}