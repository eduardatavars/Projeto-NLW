//Libs e códigos de terceiros
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}



// object {}
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-09 10:00"),
    finalizada: true
}

// lista, array, vetor [0, 1, 2]
let atividades = [
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

// atividades = []

// arrow function
const criarItemAtividade = (atividade) => {
    let input = `<input onchange="concluirAtividade(event)" value="${atividade.data}" type="checkbox" `

    if(atividade.finalizada) {
       input += 'checked' 
    }

    input += '>'

    const formatar = formatador(atividade.data);

    return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>${formatar.dia.semana.longo},
        dia ${formatar.dia.numerico}
        de ${formatar.mes}
        às ${formatar.hora}h </time>
    </div>
    `
}

const atualizarListaAtividades = () => {
    const section = document.querySelector('section');

    // verificar se a minha lista está vazia
    if(atividades.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
        return
    }

    section.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens
    
    for(let atividade of atividades) {
        section.innerHTML += criarItemAtividade(atividade);
    }

}

atualizarListaAtividades();

const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosForm = new FormData(event.target);

    const nome = dadosForm.get('atividade')
    const dia = dadosForm.get('dia')
    const hora = dadosForm.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome,
        data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data === novaAtividade.data
    })

    if(atividadeExiste) {
        return alert('Dia/Hora não disponível.')
    }

    atividades = [novaAtividade, ...atividades]
    atualizarListaAtividades()
}

const criarDiasSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03"
    ]

    let diasSelecao = '';

    for(let dia of dias) {
        const formatar = formatador(dia)
        const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`

        diasSelecao += `
        <option value="${dia}">${diaFormatado}</option>
        `
    }

    document.querySelector('select[name="dia"]').innerHTML = diasSelecao;
}
criarDiasSelecao();

const criarHoraSelecao = () => {
    let horasDisp = ''

    for(let i = 6; i < 23; i++) {
        const hora = String(i).padStart(2, '0')
        horasDisp += `<option value="${hora}:00">${hora}:00</option>`
        horasDisp += `<option value="${hora}:30">${hora}:30</option>`
    }

    document.querySelector('select[name="hora"]').innerHTML = horasDisp;
}
criarHoraSelecao();

const concluirAtividade = (event) => {
    const input = event.target
    const dataInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataInput
    })

    if(!atividade) {
        return
    }

    atividade.finalizada = !atividade.finalizada
}