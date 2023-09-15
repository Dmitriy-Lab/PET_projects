// Необходимо получить список всех пользователей с помощью бесплатного
//  API (https://jsonplaceholder.typicode.com/users) и отобразить их на странице. 
//  Пользователь должен иметь возможность удалить любого пользователя из списка.
//   Данные при получении необходимо сохранить в локальное хранилище браузера localStorage. При удалении 
//   пользователь должен удаляться не только со страницы, но и из локального хранилища localStorage
// https://api.nasa.gov/
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure

const body = document.querySelector('.body');
const url = 'https://jsonplaceholder.typicode.com/users';

async function myAsync(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

function getTemplate() {
    const userElement = document
        .querySelector('.userTemplate')
        .content
        .cloneNode(true);
    return userElement;
};

try {
    const myData = await myAsync(url);
    console.log(myData);
    myData.forEach((el) => {
        const user = getTemplate().querySelector('.userBox');
        const userName = el.name;
        user.querySelector('.userName').textContent = userName;
        body.appendChild(user);

        addUserInLocalStorage(el);

        const btnDelet = user.querySelector('.userDelete');
        btnDelet.addEventListener('click', () => {
            localStorage.removeItem(`${userName}`);
            event.target.parentElement.remove();
        });
    });
} catch (error) {
    console.log('Что-то пошло не так');
};

function addUserInLocalStorage(element) {
    const userLocalStorage = element.name;
    localStorage.setItem(`${userLocalStorage}`, `${JSON.stringify(element)}`);
}
