const socket = io();

// Atualiza a lista de produtos quando um novo produto é adicionado ou removido
socket.on("updateProducts", (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.title} - R$ ${product.price}`;
    productList.appendChild(li);
  });
});

// Captura o envio do formulário e envia via WebSocket
document.getElementById("productForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;

  socket.emit("productAdded", { title, price });
});
