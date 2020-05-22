// bloqueando acesso do usuário as variaveis das funções
(function(){
  // constante document.querySelector
  const $ = q => document.querySelector(q); 

  //converter milsegundos
  function converterPeriod(mil) {
    const min = Math.floor(mil / 60000);
    const sec = Math.floor((mil % 60000) / 1000);
    return `${min}m e ${sec}s`;
  }

  //3º parte
  //renderizando os dados na tabela
  function renderGarage() {
    const garage = getGarage();
    $("#garage").innerHTML = "";
    garage.forEach(c => addCarToGarage(c))
  }


  //2º parte
  //adicionando car in table
  function addCarToGarage(car) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${car.name}</td>
      <td>${car.license}</td>
      <td data-time="${car.time}">${new Date(car.time)
          .toLocaleString("pt-BR", 
          {
            hour: "numeric",
            minute: "numeric"
          })}</td>
      <td>
          <button class="delete">Excluir</button>
      </td>
    `;

    $("#garage").appendChild(row);
  };
    //convertendo horas e cells hs
    function checkOut(info) {
        let period = new Date() - new Date(info[2].dataset.time);
        period = converterPeriod(period);

        const license = info[1].textContent;
        //alert de exclusão do veiculo
        const msg = `O veículo: ${info[0].textContent} de placa:${license} esteve estacionado por ${period}.
        Deseja encerrar?`;

        if (!confirm(msg)) return; 

        const garage = getGarage().filter(c => c.license !== license);
        localStorage.garage = JSON.stringify(garage);
        console.log(license, garage);

        renderGarage();
    }

      //função com returno implicito, arrow function
    const getGarage = () =>  localStorage.garage ? JSON.parse(localStorage.garage) : [];
    
     renderGarage();
  
  //1º parte
  //capturando os dados do btn register pelo Id
  $ ('#send').addEventListener("click", e => {
    const name = $ ('#name').value
    const license = $ ('#license').value;

    //validação dos inputs, sem oscampos forem vazios
    if(!name || !license != false) {
      alert ("Por favor, preencha todos os campos!");
      return;
    }

    const car = { name,
                  license,
                  time: new Date()
                }
    // Usando o localStorage

    // Text em json
    const garage = getGarage();
    //obj garage recebenco um car
    garage.push(car);
    //obj em string
    localStorage.garage = JSON.stringify(garage);


    addCarToGarage(car);

    //limpando os inputs logo após o click no register
    $("#name").value = "";
    $("#license").value = "";
  });
    //função para excluir dados no button in table
  $("#garage").addEventListener("click", e => {
    if(e.target.className =="delete") 
      checkOut(e.target.parentElement.parentElement.cells);
  });

})();
