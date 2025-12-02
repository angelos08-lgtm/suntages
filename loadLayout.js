// loadLayout.js
document.addEventListener("DOMContentLoaded", async () => {
  // αν υπάρχει ήδη layout στην τρέχουσα σελίδα (π.χ. για debugging), απλώς init
  if (document.getElementById("pageheader") && typeof initMenu === "function") {
    initMenu();
    return;
  }

  const containerId = "layout"; // το placeholder div όπου θα εισάγεις το layout
  let layoutContainer = document.getElementById(containerId);

  // αν δεν υπάρχει placeholder, δημιούργησέ το στην κορυφή του body
  if (!layoutContainer) {
    layoutContainer = document.createElement("div");
    layoutContainer.id = containerId;
    // εισάγουμε πριν το main ή ως πρώτο child του body
    document.body.insertBefore(layoutContainer, document.body.firstChild);
  }

  try {
    const resp = await fetch("layout.html");
    if (!resp.ok) throw new Error(`Failed to fetch layout: ${resp.status}`);
    const html = await resp.text();
    layoutContainer.innerHTML = html;

    // μετά το insert, φορτώνουμε ΔΥΝΑΜΙΚΑ το script που περιέχει initMenu
    await loadScriptOnce("layout_script.js");

    // τώρα μπορούμε με ασφάλεια να καλέσουμε initMenu()
    if (typeof initMenu === "function") initMenu();
  } catch (err) {
    console.error("loadLayout error:", err);
  }
});

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    // αν ήδη υπάρχει script με αυτό το src, περιμένουμε να φορτώσει ή resolve αμέσως
    const existing = Array.from(document.getElementsByTagName("script"))
      .find(s => s.src && s.src.includes(src));
    if (existing) {
      // αν έχει ήδη φορτωθεί, δώσε μικρό delay για να βεβαιωθούμε
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", (e) => reject(e));
      return;
    }

    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => {
      s.dataset.loaded = "true";
      resolve();
    };
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
}
