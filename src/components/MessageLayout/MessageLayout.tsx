import styles from "./MessageLayout.module.css";
import { getCurrentTime } from "../../utils/utils";
import { Author, ICharacter } from "../../utils/interfaces";
import { AnimatePresence, motion } from "framer-motion";

interface IMessageLayoutProps {
  author: Author;
  character: ICharacter;
  isNextSameAuthor: boolean;
  isSameAuthor: boolean;
  noMessageBox?: boolean;
  messageBoxShadow?: boolean;
  time?: boolean;
  children: React.ReactNode;
}
const MessageLayout = ({
  author,
  character,
  isNextSameAuthor,
  isSameAuthor,
  time,
  noMessageBox,
  messageBoxShadow,
  children,
}: IMessageLayoutProps) => {
  return (
    <div className={styles.message_wrapper}>
      <AnimatePresence mode="popLayout">
        {author === "bot" && (
          <motion.img
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
            }}
            src={character.avatar}
            alt=""
            className={`${styles.avatar} ${
              isSameAuthor && styles.avatar_type_nomargin
            } ${isNextSameAuthor && styles.avatar_type_hide}`}
          />
        )}
      </AnimatePresence>
      <div>
        {author === "bot" && !isSameAuthor && (
          <span className={`${styles.author} ${styles.author_author_bot}`}>
            {character.name}
          </span>
        )}

        <div
          className={`${styles.messageBox} ${
            author === "bot"
              ? styles.messageBox_type_bot
              : styles.messageBox_type_user
          } ${noMessageBox && styles.messageBox_type_hidden} ${
            isNextSameAuthor && styles.messageBox_type_notail
          } ${messageBoxShadow && styles.messageBox_type_shadow}`}
        >
          {children}
          {time && (
            <span
              className={`${styles.messageBox_time} ${
                author === "bot"
                  ? styles.messageBox_time_type_bot
                  : styles.messageBox_time_type_user
              }`}
            >
              {getCurrentTime()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageLayout;
