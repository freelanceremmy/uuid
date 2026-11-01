const result = document.getElementById("uuidResult");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

let resetTimer;

function makeUUID() {
  // Modern browsers have this built in (needs https or localhost)
  if (window.crypto && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40; // version 4
  b[8] = (b[8] & 0x3f) | 0x80; // variant
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0"));
  return [
    h.slice(0, 4).join(""),
    h.slice(4, 6).join(""),
    h.slice(6, 8).join(""),
    h.slice(8, 10).join(""),
    h.slice(10).join(""),
  ].join("-");
}

function generateUUID() {
  result.textContent = makeUUID();
}

function showCopyState(text) {
  clearTimeout(resetTimer);
  copyBtn.textContent = text;
  resetTimer = setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 2000);
}

async function copyUUID() {
  const text = result.textContent;
  try {
    await navigator.clipboard.writeText(text);
    showCopyState("Copied \u2713");
  } catch (err) {
    // Fallback for browsers that block the clipboard API
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.setAttribute("readonly", "");
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand("copy");
      showCopyState("Copied \u2713");
    } catch (e) {
      showCopyState("Press and hold to copy");
    }
    document.body.removeChild(temp);
  }
}

generateBtn.addEventListener("click", generateUUID);
copyBtn.addEventListener("click", copyUUID);

// Generate one on load
generateUUID();
  
