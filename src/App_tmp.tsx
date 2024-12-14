import "./App.css";
// import Header from "./components/Header/Header";
import Chat from "./components/Chat/Chat";
import { useEffect, useState } from "react";
// import { getInitialMessages } from "./utils/api";
import { AnyMessage, ICharacter } from "./utils/interfaces";
// import NotFound from "./components/NotFound/NotFound";
// import Loader from "./components/Loader/Loader";

const mockCharacters: Record<string, ICharacter> = {
  annaAleksndrovna: {
    id: "1",
    name: "Анна Александровна",
    avatar: "https://placehold.jp/150x150.png",
  },
  olegVladimirovich: {
    id: "2",
    name: "Олег Владимирович",
    avatar: "https://placehold.jp/150x150.png",
  },
  kostya: { id: "3", name: "Любимый муж ❤️", avatar: "../kostya-avatar-3.jpg" },
  igor: { id: "4", name: "Игорь", avatar: "https://placehold.jp/150x150.png" },
  berta: { id: "5", name: "Берта", avatar: "https://placehold.jp/150x150.png" },
  sky: { id: "6", name: "Скай", avatar: "../sky-avatar-2.jpg" },
  kristina: { id: "7", name: "Кристина", avatar: "../kristina-avatar.jpg" },
  alina: { id: "8", name: "Алина", avatar: "../alina-avatar.jpg" },
  ksenia: { id: "9", name: "Ксюша", avatar: "../ksenia-avatar.jpg" },
  mary: { id: "10", name: "Мари", avatar: "../mary-avatar.jpg" },
  linh: { id: "11", name: "Linh Trương Vỹ", avatar: "../linh-avatar.jpg" },
};

const mockMessages: AnyMessage[] = [
  {
    message_id: "1",
    text: "Привет, солнце! Сегодня особенный день, и я приготовил для тебя кое-что необычное...",
    type: "text",
    author: "bot",
    character: mockCharacters.kostya,
  },
  {
    message_id: "2",
    text: "Как ты думаешь, что делает этот день таким волшебным?",
    type: "text",
    author: "bot",
    character: mockCharacters.kostya,
  },
  {
    message_id: "3",
    text: "15 декабря, это ...",
    type: "text",
    author: "bot",
    character: mockCharacters.kostya,
  },
  {
    message_id: "4",
    text: "Дeнь кoшaчьиx пacтуxoв",
    type: "text",
    author: "bot",
    character: mockCharacters.kostya,
  },
  {
    message_id: "5",
    text: "Дeнь кaпкeйкa",
    type: "text",
    author: "bot",
    character: mockCharacters.kostya,
  },
  {
    message_id: "6",
    text: "А ещё...",
    type: "text",
    author: "bot",
    character: mockCharacters.kostya,
  },
  {
    message_id: "7",
    text: "Твой День рождения!",
    type: "text",
    author: "bot",
    character: mockCharacters.kostya,
  },
  {
    message_id: "8",
    text: "Посему мы все здесь и собрались",
    type: "text",
    author: "bot",
    character: mockCharacters.kostya,
  },
  {
    message_id: "9",
    type: "keyboard",
    keyboard: [
      [
        {
          button_id: "01",
          text: "Кто все? 👀",
          placeholder: "Кто все? 👀",
          next_task_id: "01",
          next_message_character: mockCharacters.sky,
        },
      ],
    ],
    author: "user",
    character: mockCharacters.berta,
  },
];

function AppOld({
  endChat,
}: {
  endChat: React.Dispatch<React.SetStateAction<string>>;
}) {
  const mockMessagesParts: AnyMessage[][] = [
    [
      {
        message_id: "10",
        text: "*довольное мурчанье*",
        type: "text",
        author: "bot",
        character: mockCharacters.sky,
      },
      {
        message_id: "11",
        text: "Люблю тебя, мама! С мяу рождения!",
        type: "text",
        author: "bot",
        character: mockCharacters.sky,
      },
      {
        message_id: "12",
        text: "Желаю тебе много-много вкусняшек и теплой лежанки",
        type: "text",
        author: "bot",
        character: mockCharacters.sky,
      },
      {
        message_id: "13",
        text: "А ещё... А мы кушать то будем? 🤔",
        type: "text",
        author: "bot",
        character: mockCharacters.sky,
      },
      {
        message_id: "14",
        // text: 'Привет Настюша!',
        type: "keyboard",
        keyboard: [
          [
            {
              button_id: "02",
              text: "Спасибо, котофей наш 💖",
              placeholder: "Спасибо, котофей наш 💖",
              next_task_id: "02",
              next_message_character: mockCharacters.alina,
            },
          ],
        ],
        author: "user",
        character: mockCharacters.berta,
      },
    ],
    [
      {
        message_id: "15",
        text: `Олеговна, любимая моя, с твоим днем дорогая 💖
            Безумно люблю тебя, каждую минуту проведенную с тобой, каждый рассказанную тобой историю, каждую выслушанную мою, каждое твое «крыса» в мой адрес 🥹
            Сейчас уже не представляю жизнь без тебя и твоего смеха
            Поздравляю тебя с твоим днем рождения 😘
            Оставайся такой же прекрасной, невероятной, красивой, милой девушкой. Замечательной женой, хозяюшкой🩷
            Пусть жизнь дарит лишь радость и счастье, дома всегда царит любовь и уют 🥺`,
        type: "text",
        author: "bot",
        character: mockCharacters.alina,
      },
      {
        message_id: "16",
        // text: 'Привет Настюша!',
        type: "keyboard",
        keyboard: [
          [
            {
              button_id: "03",
              text: "💖 Продолжить 💖",
              placeholder: "Спасибо 💖",
              next_task_id: "03",
              next_message_character: mockCharacters.kristina,
            },
          ],
        ],
        author: "user",
        character: mockCharacters.berta,
      },
    ],
    [
      {
        message_id: "17",
        text: `Анастейша, приветик!
            С днем рождения тебя, мой хороший💞
            Хочу пожелать тебе всего самого наилучшего, чтобы ты воплотила все свои цели! Я искренне желаю тебе выбрать правильный путь, и чтобы ничто не помешало тебе идти выбранной дорогой. Пусть все у тебя сложится наилучшим образом👄`,
        type: "text",
        author: "bot",
        character: mockCharacters.kristina,
      },
      {
        message_id: "18",
        text: `Дай бог мы вместе закончим институт😂🫠 Я уверена, что ты станешь хорошим, если не лучшим специалистом (я вижу это уже сейчас)👩‍⚕️ Надеюсь, что в новом году случится все, чего ты только пожелаешь😘`,
        type: "text",
        author: "bot",
        character: mockCharacters.kristina,
      },
      {
        message_id: "19",
        text: `P.S. мы закончим 3 курс!!!!!!!!!
              твоя Крыстина🐀🐀`,
        type: "text",
        author: "bot",
        character: mockCharacters.kristina,
      },
      {
        message_id: "20",
        // text: 'Привет Настюша!',
        type: "keyboard",
        keyboard: [
          [
            {
              button_id: "04",
              text: "💖 Продолжить 💖",
              placeholder: "Кристина 🥹💖",
              next_task_id: "04",
              next_message_character: mockCharacters.ksenia,
            },
          ],
        ],
        author: "user",
        character: mockCharacters.berta,
      },
    ],
    [
      {
        message_id: "21",
        text: "Что ж, а теперь предлагаю тебе немного поиграть и потяпать в сердечко",
        type: "text",
        author: "bot",
        character: mockCharacters.kostya,
      },
      {
        message_id: "22",
        text: "Но не забудь на-...",
        type: "text",
        author: "bot",
        character: mockCharacters.kostya,
      },
      {
        message_id: "23",
        text: "Погоди-ка, мы забыли кое-кого",
        type: "text",
        author: "bot",
        character: mockCharacters.kostya,
      },
      {
        message_id: "24",
        text: "Телеграмма задержалась",
        type: "text",
        author: "bot",
        character: mockCharacters.kostya,
      },
      {
        message_id: "25",
        // text: 'Привет Настюша!',
        type: "keyboard",
        keyboard: [
          [
            {
              button_id: "05",
              text: "Кто же там? 👀",
              placeholder: "Кто же там? 👀",
              next_task_id: "05",
              next_message_character: mockCharacters.linh,
              // customOnClick: endChat,
            },
          ],
        ],
        author: "user",
        character: mockCharacters.berta,
      },
    ],
    [
      {
        message_id: "26",
        text: "С ДНЁМ РОЖДЕНИЯ!!!!🫶🏻❤️🥰😍🫶🏻 🥳",
        type: "text",
        author: "bot",
        character: mockCharacters.linh,
      },
      {
        message_id: "27",
        text: "Желаю тебе всего самого наилучшего❤️🫶🏻😍",
        type: "text",
        author: "bot",
        character: mockCharacters.linh,
      },
      {
        message_id: "28",
        text: "Чтобы все твои мечты сбылись🫶🏻❤️",
        type: "text",
        author: "bot",
        character: mockCharacters.linh,
      },
      {
        message_id: "29",
        text: "Яркого дня! Хорошего настроения ❤️🫶🏻",
        type: "text",
        author: "bot",
        character: mockCharacters.linh,
      },
      {
        message_id: "30",
        text: "я надеюсь, мы увидимся снова🥹🥺",
        type: "text",
        author: "bot",
        character: mockCharacters.linh,
      },
      {
        message_id: "31",
        text: "From Vietnam with love💕",
        type: "text",
        author: "bot",
        character: mockCharacters.linh,
      },
      {
        message_id: "32",
        // text: "From Vietnam with love💕",
        type: "attachment",
        author: "bot",
        attachments: [
          {
            id: "001",
            extension: "jpg",
            name: "test",
            size_in_kbytes: 1,
            url: "../linh-picture.jpg",
            type: "image",
          },
        ],
        character: mockCharacters.linh,
      },
      {
        message_id: "33",
        // text: 'Привет Настюша!',
        type: "keyboard",
        keyboard: [
          [
            {
              button_id: "06",
              text: "Линь 🥹🥺",
              placeholder: "Линь 🥹🥺",
              next_task_id: "06",
              next_message_character: mockCharacters.kostya,
              // customOnClick: endChat,
            },
          ],
        ],
        author: "user",
        character: mockCharacters.berta,
      },
    ],

    [
      {
        message_id: "34",
        text: "Теперь точно можешь идти тяпать сердечко",
        type: "text",
        author: "bot",
        character: mockCharacters.kostya,
      },
      {
        message_id: "35",
        text: "Но не забудь нажать на кнопочку под ним!",
        type: "text",
        author: "bot",
        character: mockCharacters.kostya,
      },
      {
        message_id: "36",
        // text: 'Привет Настюша!',
        type: "keyboard",
        keyboard: [
          [
            {
              button_id: "07",
              text: "Хорошо 💖",
              placeholder: "Хорошо 💖",
              next_task_id: "07",
              next_message_character: mockCharacters.alina,
              customOnClick: endChat,
            },
          ],
        ],
        author: "user",
        character: mockCharacters.berta,
      },
    ],
  ];
  const [initMessages, setInitMessages] = useState<AnyMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(false);
  const questId = window.location.pathname.split("/chat/")[1];
  useEffect(() => {
    setTimeout(() => {
      setInitMessages(mockMessages);
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {!isLoading && (
        <Chat
          questId={questId}
          initMessages={initMessages}
          messages={mockMessagesParts}
          endChat={endChat}
        />
      )}
    </>
  );
}

export default AppOld;
