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



