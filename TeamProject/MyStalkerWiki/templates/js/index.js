document.addEventListener("DOMContentLoaded", function () { 
  
  const clearAll = {
    el_list: [],

    clear() {
      for (let el of this.el_list) {
        el.remove();
      }
      this.el_list = [];
    }
  };

  const burgerMenu = document.getElementById("burgerMenu");
  const dropdownMenu = document.getElementById("dropdownMenu");

  burgerMenu.addEventListener("click", () => {
    dropdownMenu.classList.toggle("active");
  });

  function checkWidth() {
    if (window.innerWidth > 768) {
      dropdownMenu.classList.remove('active'); // удаляем класс, если ширина больше
    }
  }

  window.addEventListener('resize', checkWidth);

  checkWidth();

  const navBGame = document.getElementById("navBGame");
  const navBMap = document.getElementById("navBMap");
  const navBSupport= document.getElementById("navBSupport");
  const navBSearch = document.getElementById("navBSearch");
  const navBHome = document.getElementById("navBHome");

  navBGame.addEventListener("click", function () {
    clearAll.clear();
    const main_div = document.querySelector(".main-div");
    const home = document.querySelector(".home");
    home.classList.add("home-hidden");

    const game_content = document.createElement("div");
    game_content.classList.add("pda-game");

    let title = document.createElement('h2');
    title.textContent = "PDA-GAME";
    title.classList.add("title");
    game_content.appendChild(title);

    const gameBoard = document.createElement("div");
    gameBoard.classList.add("game-board");

    const shuffleButton = document.createElement("button");
    shuffleButton.textContent = "Перемішати";
    shuffleButton.classList.add("shuffle-button");

    const winMessage = document.createElement("div");
    winMessage.textContent = "Вітаємо! Ви зібрали пазл!";
    winMessage.classList.add("win-message");

    game_content.appendChild(gameBoard);
    game_content.appendChild(shuffleButton);
    game_content.appendChild(winMessage);
    clearAll.el_list.push(game_content);
    main_div.appendChild(game_content);

    let tiles = Array.from({ length: 16 }, (_, i) => i);
    const correctOrder = [...tiles];

    function initBoard() {
      gameBoard.innerHTML = "";
      tiles.forEach((tile, index) => {
        const tileElement = document.createElement("div");
        tileElement.classList.add("tile");
        if (tile === 15) {
          tileElement.classList.add("empty");
        } else {
          const row = Math.floor(tile / 4);
          const col = tile % 4;
          tileElement.style.backgroundPosition = `-${col * 100}px -${
            row * 100
          }px`;
        }
        tileElement.addEventListener("click", () => moveTile(index));
        gameBoard.appendChild(tileElement);
      });
      checkWin();
    }

    function moveTile(index) {
      const emptyIndex = tiles.indexOf(15);
      const [row, col] = [Math.floor(index / 4), index % 4];
      const [emptyRow, emptyCol] = [Math.floor(emptyIndex / 4), emptyIndex % 4];

      if (
        (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)
      ) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        initBoard();
      }
    }

    function shuffleTiles() {
      winMessage.style.display = "none";
      for (let i = 0; i < 100; i++) {
        const emptyIndex = tiles.indexOf(15);
        const [row, col] = [Math.floor(emptyIndex / 4), emptyIndex % 4];
        const neighbors = [];
        if (row > 0) neighbors.push(emptyIndex - 4);
        if (row < 3) neighbors.push(emptyIndex + 4);
        if (col > 0) neighbors.push(emptyIndex - 1);
        if (col < 3) neighbors.push(emptyIndex + 1);
        const randomNeighbor =
          neighbors[Math.floor(Math.random() * neighbors.length)];
        [tiles[emptyIndex], tiles[randomNeighbor]] = [
          tiles[randomNeighbor],
          tiles[emptyIndex],
        ];
      }
      initBoard();
    }

    function checkWin() {
      if (tiles.every((tile, index) => tile === correctOrder[index])) {
        winMessage.style.display = "block";
      }
    }

    initBoard();
    shuffleButton.addEventListener("click", shuffleTiles);
  });

  
  function openCategoryItems(category) {
    fetch(`templates/data/${category.dataname}`)
      .then((response) => response.json())
      .then((data) => {
        clearAll.clear();

        const category_data = data;

        const main_div = document.querySelector(".main-div");
        const game_content = document.createElement("div");

        const back_button = document.createElement("a");
        back_button.textContent = "← Назад";
        back_button.classList.add("back");
        back_button.addEventListener("click", () => openCategories())
        game_content.appendChild(back_button);

        game_content.classList.add("category-items");

        const title = document.createElement("h1");
        title.textContent = `Категорія: ${category.name}`;
        game_content.appendChild(title);

        const container = document.createElement("div");

        container.classList.add("category-container");

        category_data.sort((a, b) => a.name.localeCompare(b.name));
        for (let item of category_data) {
          const item_button = document.createElement("button");
          item_button.classList.add("category-button");
          const item_span = document.createElement("span");
          item_span.textContent = item.name;
          item_button.appendChild(item_span);
          
          item_button.addEventListener('click', () => openItemsArticle(item, category));
          container.appendChild(item_button);
        }        
        game_content.appendChild(container);
        clearAll.el_list.push(game_content);
        main_div.appendChild(game_content);
      });
  }

  function openItemsArticle(item, category) {
      clearAll.clear();

      const main_div = document.querySelector(".main-div");

      const item_content = document.createElement("div");
      item_content.classList.add("category-items");
      
      const back_button = document.createElement("a");
      back_button.textContent = "← Назад";
      back_button.classList.add("back");
      back_button.addEventListener("click", () => openCategoryItems(category))
      item_content.appendChild(back_button);
      // Заголовок предмету
      const title = document.createElement('h1');
      title.textContent = item.name;
      item_content.appendChild(title);

      // Опису та таблиця
      const flexContainer = document.createElement("div");

      const description = document.createElement('p');
      if (item.description && item.description.description) {
          description.textContent = item.description.description;
      } else {
          description.textContent = "Опис відсутній.";
      }

      if (item.description && Array.isArray(item.description.attributes)) {
          const leftColumn = document.createElement("div");
          flexContainer.classList.add("item-flex-container");
          leftColumn.append(description);
          leftColumn.classList.add("item-left-column");
          flexContainer.appendChild(leftColumn);

          const rightColumn = document.createElement("div");
          rightColumn.classList.add("item-right-column");

          const table = document.createElement('table');
          table.classList.add('stalker-table');

          const titleRow = document.createElement('tr');
          const titleCell = document.createElement('th');
          titleCell.textContent = item.name;
          titleCell.colSpan = 2;
          titleCell.classList.add("table-title");
          titleRow.appendChild(titleCell);
          table.appendChild(titleRow);

          for (let attribute of item.description.attributes) {
              const row = document.createElement('tr');

              if (attribute.label === "image") {
                  const imgCell = document.createElement('td');
                  imgCell.colSpan = 2;
                  const img = document.createElement('img');
                  img.src = attribute.value;
                  img.alt = "Зображення";
                  img.style.maxWidth = "100%";
                  img.style.borderRadius = "6px";
                  imgCell.appendChild(img);
                  row.appendChild(imgCell);
              } else {
                  const labelCell = document.createElement('td');
                  labelCell.textContent = attribute.label;

                  const valueCell = document.createElement('td');
                  valueCell.textContent = attribute.value;

                  row.appendChild(labelCell);
                  row.appendChild(valueCell);
              }

              table.appendChild(row);
          }

          rightColumn.appendChild(table);
          flexContainer.appendChild(rightColumn);
      }else{
          flexContainer.appendChild(description);
      }

      item_content.appendChild(flexContainer);

      // Обробка статей
      if (item.description && Array.isArray(item.description.articles)) {
          for (let article of item.description.articles) {
              const articleBlock = document.createElement("div");

              // Заголовок статті
              const articleTitle = document.createElement("h2");
              articleTitle.textContent = article.Title || "Untitled";
              articleTitle.classList.add("section-title");
              articleBlock.appendChild(articleTitle);

              // Контент статті
              if (Array.isArray(article.content)) {
                  for (let contentItem of article.content) {
                      const contentRow = document.createElement("div");
                      contentRow.classList.add("article");
                      if (contentItem.type === "text") {
                        if (contentItem.haveimg && contentItem.image) {
                          const img = document.createElement("img");
                          img.src = contentItem.image;
                          img.alt = "Зображення статті";
                          img.classList.add("article-image");
                          contentRow.appendChild(img);
                              
                          }
                          const paragraph = document.createElement("p");
                          paragraph.textContent = contentItem.value;
                          paragraph.classList.add("article-text");
                          contentRow.appendChild(paragraph);
                      }

                      else if ((contentItem.type === "orderedlist" || contentItem.type === "unorderedlist") && Array.isArray(contentItem.value)) {
                          // Додатковий текст перед списком
                          if (contentItem.valueText) {
                              const preListText = document.createElement("p");
                              preListText.textContent = contentItem.valueText;
                              contentRow.appendChild(preListText);
                          }

                          // Власне список
                          const list = contentItem.type === "orderedlist" ? document.createElement("ol") : document.createElement("ul");

                          for (let item of contentItem.value) {
                              const li = document.createElement("li");
                              li.textContent = item;
                              list.appendChild(li);
                          }
                          contentRow.appendChild(list);
                      }
                      articleBlock.appendChild(contentRow);
                  }
              }
              item_content.appendChild(articleBlock);
          }
      }   
      clearAll.el_list.push(item_content);
      main_div.appendChild(item_content);
  }

  navBMap.addEventListener('click', () => openCategories());

  function openCategories(){
    fetch('templates/data/categories.json')
    .then(response => response.json())
    .then(data => {
      clearAll.clear();
      const categories = data;
      const main_div = document.querySelector(".main-div");
      const home = document.querySelector(".home");
      home.classList.add("home-hidden");
      const game_content = document.createElement("div");
      game_content.classList.add("categories");

      let title = document.createElement('h1');
      title.textContent = "Категорії";
      title.classList.add("title");
      game_content.appendChild(title);
      
      const category_container = document.createElement("div");
      category_container.classList.add("category-container");
      for(let category of categories){
        const item = document.createElement("button");
        item.classList.add("category-button");
        const item_image = document.createElement("img");
        item_image.src = category.image;
        item.appendChild(item_image);
        const item_span = document.createElement("span");
        item_span.textContent = category.name;
        item.appendChild(item_span);
        
        item.addEventListener('click', () => openCategoryItems(category));
        category_container.appendChild(item);
      }
      game_content.appendChild(category_container);
      clearAll.el_list.push(game_content);
      main_div.appendChild(game_content);
    });
  }
  navBHome.addEventListener("click", function () {
    clearAll.clear();
    const home = document.querySelector(".home");
    home.classList.remove("home-hidden");
  });
  navBSearch.addEventListener("click", function () {
    clearAll.clear();

    const home = document.querySelector(".home");
    home.classList.add("home-hidden");

    const main_div = document.querySelector(".main-div");
    const search_div = document.createElement("div");
    search_div.classList.add("serach_div");

      // Заголовок
    const title = document.createElement('h1');
    title.className = 'title';
    title.textContent = 'Пошук';
    search_div.appendChild(title);

    // Форма
    const form = document.createElement('form');
    form.className = 'search-form';

    // Інпут
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'search-input';
    input.placeholder = 'Введіть пошуковий запит';
    form.appendChild(input);

    // Кнопка
    const button = document.createElement('button');
    button.className = 'search-button';
    button.textContent = 'Пошук';
    form.appendChild(button);

    // Додаємо форму в контейнер
    search_div.appendChild(form);

    // Контейнер для результатів
    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'searchResults';
    search_div.appendChild(resultsDiv);
    clearAll.el_list.push(search_div);
    main_div.appendChild(search_div);

      button.addEventListener("click", function (event) {
        event.preventDefault();
        const searchInput = document
          .querySelector(".search-input")
          .value.trim()
          .toLowerCase();

        if(!searchInput) return;
        check = document.querySelector(".card-container");
        if (check) check.remove();

        fetch('templates/data/categories.json')
        .then((response) => response.json())
        .then((data) => { 
          const card_container = document.createElement('div');
          card_container.classList.add("card-container");
          const errorMessageSearch = document.createElement('p');
          errorMessageSearch.textContent = "Нічого не знайдено."
          card_container.appendChild(errorMessageSearch);
          search_div.appendChild(card_container);
          for(let category of data){
            fetch(`templates/data/${category.dataname}`)
            .then((response) => response.json())
            .then((category_data) => {
              for(let item of category_data){
                if(item.name && item.name.toLowerCase().includes(searchInput.toLowerCase())){
                  if(errorMessageSearch) errorMessageSearch.remove();
                  const search_button = document.createElement('button');
                  search_button.classList.add("card");
                  const title = document.createElement('h3');
                  title.textContent = item.name;
                  search_button.appendChild(title);
                  const span = document.createElement('span');
                  span.textContent = `Категорія: ${category.name}`;
                  search_button.appendChild(span);
                  card_container.appendChild(search_button);
                  search_button.addEventListener('click', () => openItemsArticle(item, category));
                }
              }
            }).catch(() => {
              const errorMessage = document.createElement("p");
              errorMessage.textContent = "Помилка пошуку.";
              card_container.appendChild(errorMessage);
            });
          }
        }).catch(() => {
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Помилка пошуку.";
            card_container.appendChild(errorMessage);
          });
      });
  });
  function sendFeedback(event) {
    event.preventDefault();

    const oldMessage = document.querySelector(".messege");
    if (oldMessage) oldMessage.remove();
    const modalka = document.createElement("div");
    modalka.classList.add("modal-overlay");

    const message = document.createElement("div");
    message.classList.add("message");

    // Створюємо кнопку закриття
    const closeButton = document.createElement("button");
    closeButton.id = "message_close";
    closeButton.textContent = "X";

    // Створюємо абзац з текстом
    const messageTitle = document.createElement("h1");
    messageTitle.textContent = "Ваше повідомлення надіслано";

    // Створюємо абзац з текстом
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = "Ваші відгуки та пропозиції допомагають нам покращувати ресурс.";

    // Додаємо кнопку і абзац до контейнера
    message.appendChild(closeButton);
    message.appendChild(messageTitle);
    message.appendChild(messageParagraph);
    modalka.appendChild(message);
    document.body.appendChild(modalka);

    document
      .getElementById("message_close")
      .addEventListener("click", function () {
        modalka.remove();
      });

    setTimeout(() => {
      if (document.body.contains(modalka)) {
        modalka.remove();
      }
    }, 300000);
  }

  navBSupport.addEventListener("click", function () {
    clearAll.clear();

    const home = document.querySelector(".home");
    home.classList.add("home-hidden");

    const main_div = document.querySelector(".main-div");
    const main = document.createElement("div");
    main.classList.add("support-div");
    clearAll.el_list.push(main);

    const title = document.createElement("h1");
    title.className = "title";
    title.textContent = "Зворотній звʼязок";

    const form = document.createElement("form");
    form.id = "feedbackForm";

    const labelName = document.createElement("label");
    labelName.setAttribute("for", "name");
    labelName.textContent = "Ваше ім'я:";

    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.id = "name";
    inputName.name = "name";
    inputName.required = true;

    const labelType = document.createElement("label");
    labelType.setAttribute("for", "type");
    labelType.textContent = "Тип проблеми:";

    const selectType = document.createElement("select");
    selectType.id = "type";
    selectType.name = "type";
    selectType.required = true;

    const options = [
      { value: "", text: "Виберіть тип проблеми", disabled: true, selected: true },
      { value: "bug", text: "Технічні проблеми" },
      { value: "suggestion", text: "Рекомендації" },
      { value: "other", text: "Інше" },
    ];

    options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt.value;
      option.textContent = opt.text;
      if (opt.disabled) option.disabled = true;
      if (opt.selected) option.selected = true;
      selectType.appendChild(option);
    });

    const labelSubject = document.createElement("label");
    labelSubject.setAttribute("for", "subject");
    labelSubject.textContent = "Тема:";

    const inputSubject = document.createElement("input");
    inputSubject.type = "text";
    inputSubject.id = "subject";
    inputSubject.name = "subject";
    inputSubject.required = true;

    const labelMessage = document.createElement("label");
    labelMessage.setAttribute("for", "text");
    labelMessage.textContent = "Повідомлення:";

    const textarea = document.createElement("textarea");
    textarea.id = "text";
    textarea.name = "text";
    textarea.required = true;

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Відправити";

    form.append(
      labelName, inputName,
      labelType, selectType,
      labelSubject, inputSubject,
      labelMessage, textarea,
      button
    );

    main.append(title, form);
    main_div.appendChild(main);

    document
      .getElementById("feedbackForm")
      .addEventListener("submit", function (event) {
        sendFeedback(event);
        this.reset();
      });

    main_div.appendChild(main);
  });

});
