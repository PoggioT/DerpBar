// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Toast simples
const toast = (msg) => {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2200);
};

// Copiar e-mail ao clicar no card
document.querySelectorAll(".card-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const text = btn.dataset.copy || "";
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("E-mail copiado ✔");
      })
      .catch(() => {
        toast("Não foi possível copiar");
      });
  });
});

// “Salvar contato” (gera vCard básico)
document.getElementById("add-agenda").addEventListener("click", () => {
  const vcf = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Derp;Bar;;;",
    "FN:Derp Bar - Drinks & Eventos",
    "ORG:Derp Bar",
    "TITLE:Comercial / Financeiro",
    "TEL;TYPE=WORK,VOICE:+55 71 99999-9999",
    "TEL;TYPE=WORK,VOICE:+55 71 88888-8888",
    "EMAIL;TYPE=WORK:contato@derpbar.com.br",
    "URL:https://instagram.com/derpbar",
    "END:VCARD",
  ].join("\n");

  const blob = new Blob([vcf], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = "DerpBar.vcf";
  a.href = url;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast("Contato salvo (vCard) 📇");
});
