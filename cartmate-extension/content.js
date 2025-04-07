function extractProductDetails() {
  const title = document.querySelector("h1")?.innerText || "Unknown Product";
  const price = document.querySelector(".price")?.innerText || "$0.00";
  const image = document.querySelector("img")?.src || "";
  const url = window.location.href;

  chrome.storage.local.get(["cartMateData", "selectedCart"], (res) => {
    const cartName = res.selectedCart || "My Cart";
    const data = res.cartMateData || {};
    data[cartName] = data[cartName] || [];
    data[cartName].push({ title, price, image, url });
    chrome.storage.local.set({ cartMateData: data });
  });
}
extractProductDetails();