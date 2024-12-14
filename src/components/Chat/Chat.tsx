import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import { isNextSameAuthor, isSameAuthor } from "../../utils/utils";
import Attachment from "../Attachment/Attachment";
import { Text } from "../Text/Text";
import ActionCard from "../ActionCard/ActionCard";
import Banner from "../Banner/Banner";
import CityInput from "../CityInput/CityInput";
import MessageLayout from "../MessageLayout/MessageLayout";
import Keyboard from "../Keyboard/Keyboard";
import { AnyMessage, ICharacter } from "../../utils/interfaces";
// import { getNextMessages } from "../../utils/api";
import { AnimatePresence, motion } from "framer-motion";

interface IChatProps {
  questId: string;
  initMessages: AnyMessage[];
  messages: AnyMessage[][];
  endChat: React.Dispatch<React.SetStateAction<string>>;
}
const Chat = ({ questId, initMessages, messages, endChat }: IChatProps) => {
  const [chatData, setChatData] = useState<AnyMessage[]>(initMessages);
  const [nextCharacter, setNextCharacter] = useState<ICharacter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [part, setPart] = useState(0);
  const chatContainer = useRef<null | HTMLDivElement>(null);
  const loadingContainer = useRef<null | HTMLDivElement>(null);
  const messageDelay = 1500;
  // const messageDelay = 150;
  const [count, setCount] = useState(0);
  useEffect(() => {
    chatContainer.current?.scrollIntoView({ behavior: "smooth" });
  }, [count, isLoading]);
  useEffect(() => {
    loadingContainer.current?.scrollIntoView({ behavior: "smooth" });
  }, [isLoading]);

  useEffect(() => {
    console.log(chatData);
    let counter = count;
    const interval = setInterval(() => {
      if (counter > chatData.length) {
        clearInterval(interval);
      } else if (counter === chatData.length) {
        setCount((count) => count + 1);
        counter++;
        clearInterval(interval);
      } else {
        setCount((count) => count + 1);
        counter++;
      }
    }, messageDelay);
    return () => clearInterval(interval);
  }, [chatData]);

  const popItemFromChat = () => {
    setChatData((prevChatData: AnyMessage[]) => [...prevChatData.slice(0, -1)]);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addItemToChat = (item: any) => {
    setChatData((prevChatData: AnyMessage[]) => [...prevChatData, item]);
  };
  const handleSendReply = (
    character: ICharacter,
    message_id: string,
    text: string,
    button_id?: string,
    city_id?: string
  ) => {
    interface IReplyBody {
      quest_id: string;
      message_id: string;
      session_id: string;
      button_id?: string;
      city_id?: string;
    }
    setNextCharacter(character);
    const body: IReplyBody = {
      quest_id: questId,
      message_id,
      session_id: localStorage.getItem("session_id") || "",
    };
    if (city_id) {
      body.city_id = city_id;
    } else if (button_id) {
      body.button_id = button_id;
    }

    const replyItem = {
      message_id: button_id,
      text: text,
      type: "text",
      author: "user",
    };
    if (city_id || button_id) {
      popItemFromChat();
    }
    console.log("test");
    addItemToChat(replyItem);
    // setTimeout(() => {
    //   setIsLoading(true);
    //   getNextMessages(body).then((data) => {
    //     setTimeout(() => {
    //       setIsLoading(false);
    //       setChatData((prev: AnyMessage[]) => [...prev, ...data.messages]);
    //     }, 1000);
    //   });
    // }, 500);
    setTimeout(() => {
      setIsLoading(true);
      // chatContainer.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setIsLoading(false);
        setChatData((prev: AnyMessage[]) => [...prev, ...messages[part]]);
        setPart((prev) => prev + 1);
      }, 1500);
    }, 500);
  };
  return (
    <motion.section className={styles.chat}>
      <AnimatePresence>
        {chatData
          .slice(0, count)
          .map((message: AnyMessage, id: number, data: AnyMessage[]) => (
            <motion.div
              layout
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 200,
              }}
              className={`${styles.messageRow} ${
                message.author === "bot"
                  ? styles.messageRow_author_bot
                  : styles.messageRow_author_user
              }
              ${
                isSameAuthor(data, message, id) &&
                styles.messageRow_type_same_author
              }
          `}
              key={message.message_id}
              ref={chatContainer}
            >
              {message.type === "keyboard" && (
                <Keyboard
                  message={message}
                  handleSend={
                    message.keyboard[0][0].customOnClick
                      ? endChat
                      : handleSendReply
                  }
                  key={message.message_id}
                />
              )}
              {message.type === "text" && (
                <MessageLayout
                  author={message.author}
                  character={message.character}
                  isNextSameAuthor={isNextSameAuthor(data, message, id)}
                  isSameAuthor={isSameAuthor(data, message, id)}
                  time
                >
                  <Text text={message.text} />
                </MessageLayout>
              )}
              {message.type === "attachment" &&
                message.attachments.length > 0 &&
                message.attachments[0].type === "image" && (
                  //TODO: много картинок
                  <MessageLayout
                    author={message.author}
                    character={message.character}
                    isNextSameAuthor={isNextSameAuthor(data, message, id)}
                    isSameAuthor={isSameAuthor(data, message, id)}
                    noMessageBox
                  >
                    <Banner
                      url={message.attachments[0].url}
                      name={message.attachments[0].name}
                    />
                  </MessageLayout>
                )}
              {message.type === "attachment" &&
                message.attachments.length > 0 &&
                message.attachments[0].type === "file" && (
                  <MessageLayout
                    author={message.author}
                    character={message.character}
                    isNextSameAuthor={isNextSameAuthor(data, message, id)}
                    isSameAuthor={isSameAuthor(data, message, id)}
                    time
                  >
                    <Attachment item={message.attachments[0]} />
                  </MessageLayout>
                )}
              {message.type === "action_card" && (
                <MessageLayout
                  author={message.author}
                  character={message.character}
                  isNextSameAuthor={isNextSameAuthor(data, message, id)}
                  isSameAuthor={isSameAuthor(data, message, id)}
                  noMessageBox
                  messageBoxShadow
                >
                  <ActionCard
                    character={message.next_message_character}
                    messageId={message.message_id}
                    image={message.image_url}
                    title={message.title}
                    text={message.text}
                    actionButton={message.action_button}
                    nextTaskButton={message.next_task_button}
                    handleSendReply={handleSendReply}
                  />
                </MessageLayout>
              )}
              {message.type === "city_input" && (
                <MessageLayout
                  author={message.author}
                  character={message.character}
                  isNextSameAuthor={isNextSameAuthor(data, message, id)}
                  isSameAuthor={isSameAuthor(data, message, id)}
                >
                  <CityInput message={message} handleSend={handleSendReply} />
                </MessageLayout>
              )}
            </motion.div>
          ))}
      </AnimatePresence>
      {isLoading && nextCharacter !== null && (
        // {true && nextCharacter && (
        <div className={`${styles.messageRow}`} ref={loadingContainer}>
          <MessageLayout
            author="bot"
            character={nextCharacter!}
            isNextSameAuthor={false}
            isSameAuthor={true}
          >
            <span className={styles.typing}>
              <span className={styles.loader}>
                <div className={styles.dotFlashing}></div>
              </span>
            </span>
          </MessageLayout>
        </div>
      )}
    </motion.section>
  );
};

export default Chat;
