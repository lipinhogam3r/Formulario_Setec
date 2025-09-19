const btnPagamento = document.getElementById('btnPagamento');
    const popup = document.getElementById('popup');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const form = document.getElementById('pagamentoForm');

    btnPagamento.addEventListener('click', () => {
      popup.style.display = 'block';
    });

    cancelBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    confirmBtn.addEventListener('click', () => {
      popup.style.display = 'none';
      form.submit();  // Envia o form aqui só após confirmação
    });

    // Fechar popup clicando fora da área do conteúdo
    window.addEventListener('click', (event) => {
      if(event.target === popup) {
        popup.style.display = 'none';
      }
    });



function mascara(i){
   
   var v = i.value;
   
   if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
      i.value = v.substring(0, v.length-1);
      return;
   }
   
   i.setAttribute("maxlength", "14");
   if (v.length == 3 || v.length == 7) i.value += ".";
   if (v.length == 11) i.value += "-";

}



function mascaraRG(input) {
    const valor = input.value.replace(/\D/g, '');  // Remove caracteres não numéricos

    // Aplicar a máscara de forma progressiva
    if (valor.length <= 2) {
        input.value = valor.replace(/(\d{2})(\d*)/, '$1');
    } else if (valor.length <= 5) {
        input.value = valor.replace(/(\d{2})(\d{1,3})(\d*)/, '$1.$2');
    } else if (valor.length <= 8) {
        input.value = valor.replace(/(\d{2})(\d{1,3})(\d{1,3})(\d*)/, '$1.$2.$3');
    } else if (valor.length <= 10) {
        input.value = valor.replace(/(\d{2})(\d{1,3})(\d{1,3})(\d{1,2})(\d*)/, '$1.$2.$3-$4');
    } else {
        input.value = valor.replace(/(\d{2})(\d{1,3})(\d{1,3})(\d{1,2})(\d*)/, '$1.$2.$3-$4');
    }
}




const handlePhone = (event) => {
  let input = event.target
  input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}




function desativarBotao() {
    const botao = document.getElementById('meuBotao');
    botao.disabled = true;  // Desativa o botão
    // Aqui você pode colocar a lógica de envio dos dados, por exemplo, uma requisição AJAX
  }
