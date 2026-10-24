let result = document.getElementById("uuidResult");
let genBtn = document.getElementById("generateBtn");
let copyBtn = document.getElementById("copyBtn");

function generateUUID() {
  // modern browsers have this built-in
  let uuid = crypto.randomUUID();
  result.innerText = uuid;
}

genBtn.addEventListener("click", generateUUID);

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(result.innerText);
  copyBtn.innerText = "Copied! ✅";
  setTimeout(() => (copyBtn.innerHTML = "&#x29C9 Copy"), 3000);
});

// generate one on load
generateUUID();
