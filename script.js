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


function cpf(v){
    v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
                                             //de novo (para o segundo bloco de números)
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    return v
}
