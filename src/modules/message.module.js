import { setTimeout } from 'core-js/web/immediate';
import { Module } from '../core/module';

export class MessageModule extends Module {
  constructor() {
    super('custom message', 'Кастомное сообщение');
  }

  trigger() {
    const container = document.querySelector('.container');

    const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    container.append(messageContainer);

    function createRandomMessage() {
      const randomId = Math.floor(Math.random() * 501) + 1;
      const randomMessage = fetch(`${COMMENTS_URL}?id=${randomId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка запроса!');
          }
          return response.json();
        })
        .then((comments) => {
          const customMessage = document.createElement('div');
          customMessage.textContent = comments[0].name;
          messageContainer.append(customMessage);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function createMessageByInterval() {
      const creator = setInterval(() => {
        messageContainer.innerHTML = '';
        messageContainer.classList.add('hidden');
        setTimeout(() => {
          messageContainer.classList.remove('hidden');
          createRandomMessage();
        }, 1000);
      }, 5000);
      return creator;
    }

    let intervalCreator1 = createMessageByInterval();

    document.addEventListener('keydown', (event) => {
      const { key } = event;
      if (key === 'Escape') {
        clearInterval(intervalCreator1);
      } else if (key === 'Enter') {
        intervalCreator1 = createMessageByInterval();
      }
    });
  }
}
