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


 function cpf(v) {
            // Remove everything that is not a number
            v = v.replace(/\D/g, "");

            // Add dots and hyphen as the user types
            v = v.replace(/(\d{3})(\d)/, "$1.$2");           // First dot
            v = v.replace(/(\d{3})(\d)/, "$1.$2");           // Second dot
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");     // Hyphen

            return v;
        }
    return v
}

