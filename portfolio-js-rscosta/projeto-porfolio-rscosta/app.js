const dados = { nome:'', cargo:'', email:'', habilidades:[] };
const nome = document.querySelector('#nome');
const cargo = document.querySelector('#cargo');
const email = document.querySelector('#email');
const habInput = document.querySelector('#habInput');
const habLista = document.querySelector('#habLista');
const preview = document.querySelector('#preview');

document.querySelector('#addHab').onclick = () => {
  const h = habInput.value.trim();
  if(!h) return;
  dados.habilidades.push(h);
  habInput.value = '';
  render();
};

[nome,cargo,email].forEach(input=>{
  input.oninput = () => {
    dados.nome = nome.value; dados.cargo = cargo.value; dados.email = email.value;
    render();
  };
});

function render(){
  habLista.innerHTML = dados.habilidades.map(h=>`<li>${h}</li>`).join('');
  preview.innerHTML = `
    <h3>${dados.nome}</h3>
    <p>${dados.cargo}</p>
    <p>${dados.email}</p>
    <strong>Habilidades:</strong> ${dados.habilidades.join(', ')}
  `;
}

document.querySelector('#exportar').onclick = () => {
  const blob = new Blob([preview.innerHTML], {type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'curriculo.html';
  a.click(); URL.revokeObjectURL(url);
};

