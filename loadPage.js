// loadPage.js
document.addEventListener("DOMContentLoaded", async () => {

  // Πού θα φορτώσει το περιεχόμενο
  const content = document.getElementById("content");
  if (!content) {
    console.error("Δεν βρέθηκε #content στο layout.html");
    return;
  }

  // Από ποιο αρχείο να φορτώσει το content;
  // Παράδειγμα: arxiki.html → fetch("pages/arxiki.html")
  const pageName = document.body.dataset.page || "arxiki";
  const url = `pages/${pageName}.html`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(resp.status);
    
    const html = await resp.text();
    content.innerHTML = html;

    // Αν η σελίδα έχει δικό της script, μπορείς να το φορτώσεις:
    await loadPageScript(`${pageName}.js`);

  } catch (err) {
    console.error("Error loading page:", err);
    content.innerHTML = "<p>⚠️ Σφάλμα φόρτωσης σελίδας.</p>";
  }
});

function loadPageScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => resolve(); // μη σπάει αν δεν υπάρχει
    document.body.appendChild(script);
  });
}
