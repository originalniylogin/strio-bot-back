import { isDefined } from 'utilities';

export const KEYBOARD_ACTIONS = {
  start: 'Добавить',
  finish: 'Стоп',
};

export const MESSAGE_TEXTS = {
  start: (name?: string) => `
${isDefined(name) ? `Привет, ${name}!` : 'Привет!'}

На связи группа СТРИО, так вышло, что мы находимся на расстоянии друг от друга в трех разных городах — Чебоксарах, Нижнем Новгороде и Ростове-на-Дону. 29 ноября выходит новая песня «Снова»! Она про расстояния, и мы решили их преодолеть вместе с вами.

«Дай мне слово, что увидимся когда-нибудь ещё». Делимся с тобой этим отрывком из песни и историями, как мы сами говорили кому-то такие слова: были с кем-то на связи, но оставались далеко далеко и как преодолевали это.

Расскажи в ответ свою такую же историю этому боту, мы запишем ее и поделимся со всеми, кого она поддержит.
Можно текстом, а можно голосом! Можно анонимно или нет.

Как будешь готов - просто начни рассказывать.
Как закончишь - нажми кнопку "Стоп".
`,
  finish: {
    text: `
    Спасибо тебе!

Если ещё не заполнил адрес, чтобы получить открытку от СТРИО:
`,
    link: { label: 'Хочу открытку!', href: 'https://forms.yandex.ru/u/6738c1d302848f5b67b93394/' },
  },
  socials: {
    text: 'А здесь можно послушать другие песни СТРИО и узнать, где можно будет услышать истории',
    link: { label: 'СТРИО на Bandlink', href: 'https://band.link/streeo' },
  },
  sinature: `
Увидимся!
Глеб, Настя, Егор.
`,
};
