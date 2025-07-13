document.getElementById("randevuForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const token = grecaptcha.getResponse();

  // reCAPTCHA kontrolü
  if (!token) {
    const mesajEl = document.getElementById("mesaj");
    mesajEl.textContent = "Lütfen reCAPTCHA doğrulamasını tamamlayın.";
    mesajEl.className = "error";
    return;
  }

  // Form verilerini hazırla
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    date: form.date.value,
    time: form.time.value,
    token: token
  };

  // Google Apps Script Web App URL — kendi URL’ini burada kullan
  const endpoint = "https://script.google.com/macros/s/AKfycbyeNsc-n5pORvHfBjrg7yHq8zdlQ-i41XGdqOAP9tDgioCLeuz2X0_npHYsSX-dVvg9zw/exec";

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) throw new Error("Ağ hatası veya CORS sorunu!");
    return res.json();
  })
  .then(result => {
    const mesajEl = document.getElementById("mesaj");

    if (result.success) {
      mesajEl.textContent = "✅ Randevunuz başarıyla alındı! E-postanızı kontrol edin.";
      mesajEl.className = "success";
      form.reset();
      grecaptcha.reset();
    } else {
      mesajEl.textContent = "❌ Hata: " + (result.message || "İşlem tamamlanamadı.");
      mesajEl.className = "error";
    }
  })
  .catch(err => {
    const mesajEl = document.getElementById("mesaj");
    mesajEl.textContent = "🚫 Sunucu hatası: " + err.message;
    mesajEl.className = "error";
  });
});

