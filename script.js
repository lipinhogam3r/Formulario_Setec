function initMatrixAnimation() {
  const canvas = document.getElementById("matrixCanvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Matrix characters (including some programming symbols)
  const chars =
    "SETEC2025SETEC2025SETEC2025SETEC2025SETEC2025SETEC2025SETEC2025SETEC2025SETEC2025SETEC2025SETEC2025"
  const charArray = chars.split("")

  const fontSize = 14
  const columns = canvas.width / fontSize
  const drops = []

  // Initialize drops
  for (let i = 0; i < columns; i++) {
    drops[i] = 1
  }

  function draw() {
    // Semi-transparent black background for trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Purple text
    ctx.fillStyle = "#7c3aed"
    ctx.font = fontSize + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      // Reset drop to top randomly
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  // Start animation
  setInterval(draw, 50)
}

// Form type switching and initialization
document.addEventListener("DOMContentLoaded", () => {
  const typeCards = document.querySelectorAll(".type-card")
  const organizadorForm = document.getElementById("organizadorForm")
  const visitanteForm = document.getElementById("visitanteForm")

  initMatrixAnimation()

  // Initialize with organizer form
  showForm("organizador")

  // Handle type card selection
  typeCards.forEach((card) => {
    card.addEventListener("click", function () {
      const type = this.dataset.type

      // Update active state
      typeCards.forEach((c) => c.classList.remove("active"))
      this.classList.add("active")

      // Show corresponding form
      showForm(type)
    })
  })

  function showForm(type) {
    if (type === "organizador") {
      organizadorForm.classList.remove("hidden")
      visitanteForm.classList.add("hidden")
    } else {
      organizadorForm.classList.add("hidden")
      visitanteForm.classList.remove("hidden")
    }
  }

  const radioButtons = document.querySelectorAll('input[name="tipo_usuario"]')
  const studentOnlyFields = document.querySelectorAll(".student-only-field")

  // Initial state check
  function updateFieldsVisibility() {
    const selectedValue = document.querySelector('input[name="tipo_usuario"]:checked')?.value

    if (selectedValue === "professor") {
      // Hide student-only fields and remove required attribute
      studentOnlyFields.forEach((field) => {
        field.classList.add("hidden")
        const inputs = field.querySelectorAll("input, select")
        inputs.forEach((input) => {
          input.removeAttribute("required")
        })
      })
    } else {
      // Show student-only fields and add required attribute
      studentOnlyFields.forEach((field) => {
        field.classList.remove("hidden")
        const inputs = field.querySelectorAll("input, select")
        inputs.forEach((input) => {
          input.setAttribute("required", "required")
        })
      })
    }
  }

  // Set initial state
  updateFieldsVisibility()

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", updateFieldsVisibility)
  })

  // Student form - shows popup first, then submits after confirmation
  const studentForm = document.getElementById("studentForm")
  const btnPagamento = document.getElementById("btnPagamento")
  const popup = document.getElementById("popup")
  const confirmBtn = document.getElementById("confirmBtn")
  const cancelBtn = document.getElementById("cancelBtn")
  const cancelBtn2 = document.getElementById("cancelBtn2")

  // Student form button click - show popup
  if (btnPagamento) {
    btnPagamento.addEventListener("click", (e) => {
      e.preventDefault()

      if (!validateForm(studentForm)) {
        showAlert("Por favor, preencha todos os campos obrigatórios.", "error")
        return
      }

      if (popup) {
        popup.style.display = "flex"
        document.body.style.overflow = "hidden"
      }
    })
  }

  // Popup confirm button - submit student form
  if (confirmBtn && studentForm) {
    confirmBtn.addEventListener("click", async (e) => {
      e.preventDefault()

      if (popup) {
        popup.style.display = "none"
        document.body.style.overflow = "auto"
      }

      const submitBtn = confirmBtn
      showLoadingState(submitBtn, true)

      try {
        const formData = new FormData(studentForm)

        const response = await fetch(studentForm.action, {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          showAlert("✅ Inscrição enviada com sucesso! Você receberá uma confirmação por email.", "success")
          clearForm(studentForm)
        } else {
          throw new Error("Erro na resposta do servidor")
        }
      } catch (error) {
        console.error("Erro no envio:", error)
        showAlert("❌ Erro na conexão. Verifique sua internet ou tente mais tarde.", "error")
      } finally {
        showLoadingState(submitBtn, false)
      }
    })
  }

  // Popup cancel buttons
  if (cancelBtn && popup) {
    cancelBtn.addEventListener("click", () => {
      popup.style.display = "none"
      document.body.style.overflow = "auto"
    })
  }

  if (cancelBtn2 && popup) {
    cancelBtn2.addEventListener("click", () => {
      popup.style.display = "none"
      document.body.style.overflow = "auto"
    })
  }

  // Close popup when clicking outside
  if (popup) {
    window.addEventListener("click", (event) => {
      if (event.target === popup) {
        popup.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  }

  // Visitor form - direct submission
  const visitorForm = document.getElementById("visitorForm")
  if (visitorForm) {
    visitorForm.addEventListener("submit", async function (e) {
      e.preventDefault()

      if (!validateForm(this)) {
        showAlert("Por favor, preencha todos os campos obrigatórios.", "error")
        return
      }

      const submitBtn = this.querySelector('button[type="submit"]')
      showLoadingState(submitBtn, true)

      try {
        const formData = new FormData(this)

        const response = await fetch(this.action, {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          showAlert("✅ Inscrição enviada com sucesso! Você receberá uma confirmação por email.", "success")
          clearForm(this)
        } else {
          throw new Error("Erro na resposta do servidor")
        }
      } catch (error) {
        console.error("Erro no envio:", error)
        showAlert("❌ Erro na conexão. Verifique sua internet ou tente mais tarde.", "error")
      } finally {
        showLoadingState(submitBtn, false)
      }
    })
  }

  // Initialize input masks
  initializeInputMasks()

  // Initialize city/school selection
  initializeCitySchoolSelection()

  // Initialize animations
  initializeAnimations()

  // Initialize mobile menu
  initializeMobileMenu()
})

function initializeInputMasks() {
  // CPF Mask
  const cpfInputs = document.querySelectorAll('input[name="cpf_aluno"]')
  cpfInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      e.target.value = value
    })
  })

  // RG Mask
  const rgInputs = document.querySelectorAll('input[name="rg_aluno"]')
  rgInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[A-Za-z]/g, "")
    })
  })

  const phoneInputs = document.querySelectorAll('input[type="tel"]')
  phoneInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")

      // Limit to 11 digits
      if (value.length > 11) {
        value = value.slice(0, 11)
      }

      // Apply mask: (99) 99999-9999
      if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
      } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
      } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2")
      } else if (value.length >= 1) {
        value = value.replace(/(\d{0,2})/, "($1")
      }

      e.target.value = value
    })

    // Handle backspace and delete properly
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        setTimeout(() => {
          let value = e.target.value.replace(/\D/g, "")

          if (value.length >= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
          } else if (value.length >= 7) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
          } else if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2")
          } else if (value.length >= 1) {
            value = value.replace(/(\d{0,2})/, "($1")
          }

          e.target.value = value
        }, 0)
      }
    })
  })
}

// City and School Selection
function initializeCitySchoolSelection() {
  const colegiosPorCidade = {
    Ivaipora: [
      { value: "Antonio Diniz", text: "C. E. Antônio Diniz Pereira" },
      { value: "Barbosa Ferraz", text: "C. E. Barbosa Ferraz" },
      { value: "Bento Mossurunga", text: "C. E. Bento Mossurunga" },
      { value: "Ceebja", text: "Ceebja de Ivaiporã - E. F. M." },
      { value: "Barão do Cerro Azul", text: "C. E. Barão do Cerro Azul" },
      { value: "Idalia Rocha", text: "C. E. Idalia Rocha" },
      { value: "Jose de Mattos", text: "E. E. C. José de Mattos Leão" },
      { value: "Mater", text: "C. E. Mater" },
      { value: "Nilo Pecanha", text: "C. E. Nilo Peçanha" },
      { value: "Santa Barbara", text: "E. E. C. Santa Bárbara" },
    ],
    "Jardim Alegre": [
      { value: "Anita Garibaldi", text: "C. E. Anita Garibaldi" },
      { value: "Barra Preta", text: "C. E. Barra Preta" },
      { value: "Cora Coralina", text: "C. E. Cora Coralina" },
      { value: "Cristovao Colombo", text: "C. E. Cristóvão Colombo" },
      { value: "Jose Marti", text: "C. E. José Martí" },
    ],
    "Visitante não vinculado": [
      { value: "Visitante não vinculado", text: "Visitante não vinculado" }
    ],
    Lidianopolis: [
      { value: "Pedro I", text: "C. E. Pedro I" },
      { value: "Benedito Serra", text: "E. E. C. Benedito Serra" },
    ],
    Lunardelli: [
      { value: "Geremia Lunardelli", text: "C. E. Geremia Lunardelli" },
      { value: "Leonardo Becher", text: "E. E. C. Leonardo Becher" },
    ],
    Arapua: [
      { value: "Arapua", text: "C. E. Arapuã" },
      { value: "Candida", text: "C. E. Cândida" },
      { value: "Romeopolis", text: "C. E. Romeópolis" },
    ],
    Cruzmaltina: [
      { value: "Gualter Farias Negrao", text: "C.E. Gualter Farias Negrao" },
      { value: "Jose Ferreira Diniz", text: "C.E. Jose Ferreira Diniz" },
    ],
    Ariranha: [{ value: "Kennedy", text: "C.E. Kennedy" }],
    "Sao Joao do Ivai": [
      { value: "Arthur de Azevedo", text: "C.E. Arthur de Azevedo" },
      { value: "Diogo A Correia", text: "C.E. Diogo A Correia" },
      { value: "Jamil Aparecido Bonacin", text: "C.E. Jamil Aparecido Bonacin" },
      { value: "Jose de Mattos Leao", text: "C.E. Jose de Mattos Leao" },
      { value: "Julio Emerenciano", text: "C.E. Julio Emerenciano" },
    ],
    "Sao Pedro do Ivai": [
      { value: "Carlos Silva", text: "C.E. Carlos Silva" },
      { value: "Conj Hab Virginio Seco", text: "C.E. Conj Hab Virginio Seco" },
      { value: "Mariza", text: "C.E. Mariza" },
      { value: "Vicente Machado", text: "C.E. Vicente Machado" },
    ],
  }

  const cidadeSelect = document.getElementById("cidade")
  const colegioSelect = document.getElementById("colegio")

  if (cidadeSelect && colegioSelect) {
    cidadeSelect.addEventListener("change", function () {
      const cidadeSelecionada = this.value

      // Clear school select
      colegioSelect.innerHTML = ""

      if (colegiosPorCidade[cidadeSelecionada]) {
        // Add default option
        const defaultOption = document.createElement("option")
        defaultOption.value = ""
        defaultOption.textContent = "Selecione o colégio"
        defaultOption.disabled = true
        defaultOption.selected = true
        colegioSelect.appendChild(defaultOption)

        // Populate schools for selected city
        colegiosPorCidade[cidadeSelecionada].forEach((colegio) => {
          const option = document.createElement("option")
          option.value = colegio.value
          option.textContent = colegio.text
          colegioSelect.appendChild(option)
        })
      } else {
        // If no schools for the city, show message
        const option = document.createElement("option")
        option.value = ""
        option.textContent = "Nenhum colégio disponível"
        option.disabled = true
        option.selected = true
        colegioSelect.appendChild(option)
      }
    })
  }
}

// Utility Functions
function showLoadingState(button, isLoading) {
  if (!button) return

  if (isLoading) {
    button.disabled = true
    button.classList.add("loading")
    button.dataset.originalContent = button.innerHTML
    button.innerHTML = `
      <div class="spinner"></div>
      Enviando...
    `
  } else {
    button.disabled = false
    button.classList.remove("loading")
    if (button.dataset.originalContent) {
      button.innerHTML = button.dataset.originalContent
    }
  }
}

function showAlert(message, type = "info") {
  // Remove existing alerts
  const existingAlert = document.querySelector(".custom-alert")
  if (existingAlert) {
    existingAlert.remove()
  }

  // Create alert element
  const alert = document.createElement("div")
  alert.className = `custom-alert custom-alert-${type}`

  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"

  alert.innerHTML = `
    <div class="alert-content">
      <span class="alert-icon">${icon}</span>
      <span class="alert-message">${message}</span>
      <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `

  // Add to page
  document.body.appendChild(alert)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentElement) {
      alert.remove()
    }
  }, 5000)

  // Animate in
  setTimeout(() => {
    alert.classList.add("show")
  }, 100)
}

function clearForm(form) {
  // Reset all form fields
  form.reset()

  // Clear any validation styles
  const inputs = form.querySelectorAll("input, select")
  inputs.forEach((input) => {
    input.style.borderColor = ""
    input.classList.remove("error")
  })

  // Reset radio buttons to default state (only for student form)
  if (form.id === "studentForm") {
    const tipoUsuarioRadios = form.querySelectorAll('input[name="tipo_usuario"]')
    if (tipoUsuarioRadios.length > 0) {
      tipoUsuarioRadios[0].checked = true
      tipoUsuarioRadios[0].dispatchEvent(new Event("change"))
    }
  }
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#ef4444"
      isValid = false
    } else {
      field.style.borderColor = "rgba(75, 85, 99, 0.4)"
    }
  })

  return isValid
}

// Animations
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe form elements for animations
  document.querySelectorAll(".form-group, .type-card").forEach((el) => {
    el.classList.add("fade-in-up")
    observer.observe(el)
  })

  // Header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (window.scrollY > 50) {
      header.style.background = "rgba(0, 0, 0, 0.95)"
    } else {
      header.style.background = "rgba(0, 0, 0, 0.8)"
    }
  })

  // Add focus effects to inputs
  document.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)"
    })

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)"
    })
  })
}

// Mobile Menu
function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const nav = document.querySelector(".nav")

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuToggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove("active")
      }
    })

    // Close menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        nav.classList.remove("active")
      }
    })
  }
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Close popup with Escape key
  if (e.key === "Escape") {
    const popup = document.getElementById("popup")
    if (popup && popup.style.display === "flex") {
      popup.style.display = "none"
      document.body.style.overflow = "auto"
    }
  }
})

console.log("🚀 SETEC 2025 - Formulário carregado com sucesso!")



