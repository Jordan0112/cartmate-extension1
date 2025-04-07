function renderCartSelector(carts, selected) {
  const select = document.getElementById("cartSelect");
  select.innerHTML = '';
  for (const cartName of Object.keys(carts)) {
    const opt = document.createElement("option");
    opt.value = cartName;
    opt.textContent = cartName;
    if (cartName === selected) opt.selected = true;
    select.appendChild(opt);
  }
}

function renderItems(items) {
  const container = document.getElementById("items");
  container.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${item.image}" width="80" />
      <strong>${item.title}</strong><br>
      ${item.price}<br>
      <a href="${item.url}" target="_blank">View</a>
      <hr>
    `;
    container.appendChild(div);
  });
}

chrome.storage.local.get(["cartMateData", "selectedCart"], ({ cartMateData = {}, selectedCart = "My Cart" }) => {
  renderCartSelector(cartMateData, selectedCart);
  renderItems(cartMateData[selectedCart] || []);
});

document.getElementById("cartSelect").addEventListener("change", (e) => {
  const selected = e.target.value;
  chrome.storage.local.set({ selectedCart: selected }, () => location.reload());
});

document.getElementById("createCart").addEventListener("click", () => {
  const name = document.getElementById("newCartName").value.trim();
  if (!name) return;
  chrome.storage.local.get("cartMateData", ({ cartMateData = {} }) => {
    cartMateData[name] = [];
    chrome.storage.local.set({ cartMateData, selectedCart: name }, () => location.reload());
  });
});