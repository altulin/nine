const form = document.querySelector(".search__form");
const resultsContainer = document.querySelector(".search__findings-list");
const countContainer = document.querySelector(".search__findings");
const errorContainer = document.querySelector(".search__error");

const renderError = () => {
  errorContainer.innerHTML = `
        <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
        <p class="search__error-message">
            Произошла ошибка...
        </p>
  `;
  countContainer.innerHTML = "";
};

const renderEmptyResults = () => {
  errorContainer.innerHTML = `
        <img src="https://code.s3.yandex.net/web-code/entrance-test/search.svg" alt="" class="search__error-icon" />
        <p class="search__error-message">
            По вашему запросу ничего не найдено, попробуйте уточнить запрос
        </p>
  `;
  countContainer.innerHTML = "";
};

const renderCount = (count) => {
  countContainer.innerHTML = `
      Найдено <span class="search__findings-amount">${count.toLocaleString(
        "ru-RU"
      )}</span> результатов
  `;
};

const onSubmitStart = () => {
  countContainer.innerHTML = `Загрузка...`;
  resultsContainer.innerHTML = "";
  errorContainer.innerHTML = "";
};

function template(item) {
  const newElement = document.createElement("li");
  newElement.classList.add("search__finding-item");
  newElement.innerHTML = `

      <a href="${item.html_url}" class="search__finding-link">${item.full_name}</a>
      <span class="search__finding-description">${item.description}</span>
	`;
  return newElement;
}

async function onSubmit(event) {
  const text = this.title.value;

  event.preventDefault();

  const status = function (response) {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText));
    }
    return Promise.resolve(response);
  };

  const json = function (response) {
    return response.json();
  };

  event.preventDefault();
  onSubmitStart();

  fetch(`https://api.nomoreparties.co/github-search?q=${text}`)
    .then(status)
    .then(json)
    .then(function (data) {
      const count = data.total_count;
      const arr = data.items;

      count ? renderCount(count) : renderEmptyResults();
      /* eslint-disable-next-line */
      for (let item of arr) {
        resultsContainer.append(template(item));
      }
    })
    .catch(function (error) {
      renderError();
    });
}

form.addEventListener("submit", onSubmit);
