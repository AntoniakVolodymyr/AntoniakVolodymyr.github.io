document.getElementById("catalogLink").addEventListener("click", loadCategories);
document.getElementById("homeLink").addEventListener("click", showHome);

function showHome() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h1>Вітаємо у каталозі товарів</h1>
    <p>Оберіть дію з меню зверху</p>
  `;
}

function loadCategories() {
  fetch("categories.json")
    .then((res) => res.json())
    .then((categories) => {
      const content = document.getElementById("content");
      content.innerHTML = "<h2>Категорії</h2><div class='category-list'></div>";
      const list = content.querySelector(".category-list");

      categories.forEach((cat) => {
        const link = document.createElement("a");
        link.textContent = cat.name;
        link.href = "#";
        link.addEventListener("click", () => loadCategory(cat.shortname));
        list.appendChild(link);
      });

      const special = document.createElement("a");
      special.textContent = "Рандомний каталог";
      special.href = "#";
      special.addEventListener("click", () => {
        const random = categories[Math.floor(Math.random() * categories.length)];
        loadCategory(random.shortname);
      });
      list.appendChild(special);
    });
}

function loadCategory(shortname) {
  fetch(`${shortname}.json`)
    .then((res) => res.json())
    .then((data) => {
      const content = document.getElementById("content");
      content.innerHTML = `<h2>${data.category}</h2><div class="items"></div>`;
      const itemsContainer = content.querySelector(".items");

      data.items.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.innerHTML = `
          <img src="${item.image || `https://place-hold.it/200x200?text=${item.shortname}`}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <strong>${item.price}</strong>
        `;
        itemsContainer.appendChild(itemDiv);
      });
    });
}
