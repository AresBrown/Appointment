document.getElementById("randevuForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const token = grecaptcha.getResponse();

  if (!token) {
    document.getElementById("mesaj").textContent = "Lütfen reCAPTCHA doğrulamasını tamamlayın.";
    return;
  }

  const data = {
    name: form.name.value,
    email: form.email.value,
    date: form.date.value,
    time: form.time.value,
    token: token
  };

  fetch("https://script.google.com/macros/s/AKfycbyeNsc-n5pORvHfBjrg7yHq8zdlQ-i41XGdqOAP9tDgioCLeuz2X0_npHYsSX-dVvg9zw/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
    .then(result => {
      if (result.success) {
        document.getElementById("mesaj").textContent = "Randevunuz alındı! E-posta kutunuzu kontrol edin.";
        form.reset();
        grecaptcha.reset();
      } else {
        document.getElementById("mesaj").textContent = "Hata: " + result.message;
      }
    }).catch(err => {
      document.getElementById("mesaj").textContent = "Sunucu hatası: " + err.message;
    });
});
