// -------------------- Φόρτωση layout --------------------
fetch('layout.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('layout1').innerHTML = html;

    // Φόρτωση layout JS
    const script = document.createElement('script');
    script.src = 'layout_script.js';
    document.body.appendChild(script);