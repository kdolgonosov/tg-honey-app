import React, { CSSProperties, useState } from "react";
import { motion, AnimatePresence, MotionStyle } from "framer-motion";
import AppOld from "./App_tmp";
import { shareURL } from "@telegram-apps/sdk-react";

const App = () => {
  // const [showGreeting, setShowGreeting] = useState(true);
  const [stage, setStage] = useState("greeting");

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fdf6e3",
        overflow: "hidden",
      }}
    >
      {/* <h1>{showGreeting.toString()}</h1> */}
      <AnimatePresence>
        {stage === "greeting" && (
          <Greeting
            key="greeting"
            endless={false}
            onComplete={() => setStage("heartTransition")}
          />
        )}
        {stage === "heartTransition" && (
          <HeartTransition
            key="heartTransition"
            onComplete={() => setStage("chat")}
          />
        )}
        {stage === "chat" && (
          <>
            <AppOld
              key="chat"
              endChat={() => setStage("reverseHeartTransition")}
            />
            <HeartBackground />
          </>
        )}
        {stage === "reverseHeartTransition" && (
          <ReverseHeartTransition
            key="reverseHeartTransition"
            onComplete={() => setStage("tapping")}
          />
        )}
        {stage === "tapping" && (
          <Greeting
            key="tapping"
            endless={true}
            onComplete={() => setStage("heartTransition")}
          />
        )}
        {/* {stage === "chat" && <AppOld key="chat" />} */}
        {/* {showGreeting ? (
          <Greeting key="greeting" onComplete={() => setShowGreeting(false)} />
        ) : (
          // <ChatSimulation key="chat" />
          
          // <p>test</p>
        )} */}
      </AnimatePresence>
    </div>
  );
};
const HeartTransition = ({
  onComplete,
}: {
  onComplete: (value: React.SetStateAction<string>) => void;
}) => {
  return (
    <div
      style={{
        backgroundColor: "#fdf6e3",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: "0",
        top: "0",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(42px, 18px)",
          backgroundImage: "url(../heart-2.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "200px",
          height: "200px",
        }}
        initial={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        animate={{ opacity: 0, scale: 10, x: "-50%", y: "-50%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
      />
    </div>
  );
};
const ReverseHeartTransition = ({
  onComplete,
}: {
  onComplete: (value: React.SetStateAction<string>) => void;
}) => {
  return (
    <div
      style={{
        backgroundColor: "#fdf6e3",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: "0",
        top: "0",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(42px, 18px)",
          backgroundImage: "url(../heart-2.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "200px",
          height: "200px",
        }}
        initial={{ opacity: 0, scale: 10, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
      />
    </div>
  );
};
// Приветствие

interface IGreetingProps {
  onComplete: (value: React.SetStateAction<string>) => void;
  endless: boolean;
}
const Greeting = ({ onComplete, endless }: IGreetingProps) => {
  const [clickCount, setClickCount] = useState(0);
  const maxClicks = endless ? Infinity : 5;
  const handleShareResult = () => {
    shareURL(
      "https://t.me/emojisbots_bot/",
      `Люблю тебя, я натяпала ${clickCount} ❤️`
    );
  };
  const handleClick = () => {
    if (clickCount < maxClicks - 1) {
      setClickCount(clickCount + 1);
    } else {
      if (clickCount === maxClicks) {
        setClickCount(clickCount + 1);
      }
      setTimeout(onComplete, 200); // Завершаем после последней анимации
    }
  };

  return (
    <motion.div
      // initial={{ opacity: 1, scale: 1 }}
      // animate={{ opacity: 1, scale: 1 }}
      // transition={{ duration: 1 }}
      style={styles.greetingContainer}
    >
      {endless && (
        <motion.h1
          initial={{ opacity: 0, scale: 0, x: "-50%" }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleShareResult}
          style={{
            position: "absolute",
            left: "50%",
            top: "100px",
            textAlign: "center",
          }}
        >
          Натяпано<p style={{ margin: "4px" }}>{clickCount} ❤️</p>
        </motion.h1>
      )}
      <motion.div
        onClick={handleClick}
        // initial={{ scale: 0 }}
        whileTap={{ scale: 0.9 }}
        // animate={{ scale: 1 }}
        style={styles.heart}
      ></motion.div>
      {endless && clickCount > 5 && (
        <motion.button
          initial={{ opacity: 0, scale: 0, x: "-50%" }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleShareResult}
          style={{
            position: "absolute",
            bottom: "100px",
            left: "50%",
            zIndex: 2,
            color: "#000",
            backgroundColor: "#fff",
            fontSize: "16px",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "0px",
            boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
          }}
        >
          Сообщить Коте
        </motion.button>
      )}
      <HeartBurst />
    </motion.div>
  );
};

// Анимация разлета сердечек
const HeartBurst = () => {
  return (
    <AnimatePresence>
      <motion.div
        style={styles.heartSplitContainer}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        key={Date.now()}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            style={styles.smallHeart}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0.5,
              x: Math.random() * 500 - 250, // Разлетаются горизонтально
              y: Math.random() * 1000 - 500, // Разлетаются вертикально
              scale: Math.random() + 0.5,
            }}
            transition={{ duration: 2 }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

// Симуляция чата
// const ChatSimulation = () => {
//   return (
//     <div style={styles.chatContainer}>
//       <HeartBackground />
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         style={styles.chat}
//       >
//         <Message text="Доброе утро, любимая! 💖" delay={0} />
//         <Message text="Поздравляю тебя с этим особенным днем!" delay={2} />
//         <Message text="Ты делаешь мою жизнь волшебной! 🥰" delay={4} />
//       </motion.div>
//     </div>
//   );
// };

// Анимированный фон с сердечками
const HeartBackground = () => {
  return (
    <motion.div style={styles.heartBackground}>
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0.5,
            y: "100vh",
            x: `${Math.random() * 100}vw`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 1.5],
            y: "-10vh",
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            ...styles.floatingHeart,
            // top: `${Math.random() * 100}%`,
            // left: `${Math.random() * 100}%`,
            // animationDelay: `${Math.random() * 5}s`,
          }}
          // animate={{ rotate: 45 }}
        ></motion.div>
      ))}
    </motion.div>
  );
};

// Сообщения в чате
// const Message = ({ text, delay }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.5 }}
//       style={styles.message}
//     >
//       {text}
//     </motion.div>
//   );
// };

const styles: Record<string, MotionStyle | CSSProperties> = {
  container: {
    // border: "1px solid red",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#fdf6e3",
    overflow: "hidden",
    // position: "relative",
    // zIndex: -2,
  },
  greetingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fdf6e3",
    overflow: "hidden",
  },
  heart: {
    fontSize: "5rem",
    cursor: "pointer",
    color: "#e63946",
    position: "relative",
    zIndex: 2,
    backgroundImage: "url(../heart-2.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "200px",
    height: "200px",
  },

  heartSplitContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  smallHeart: {
    fontSize: "1.5rem",
    position: "absolute",
  },
  chatContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  chat: {
    position: "absolute",
    bottom: "20px",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
  },
  message: {
    background: "#fff",
    padding: "10px 20px",
    borderRadius: "20px",
    margin: "10px 0",
    maxWidth: "70%",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    alignSelf: "flex-start",
  },
  heartBackground: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: 0,
  },
  floatingHeart: {
    position: "absolute",
    width: "30px",
    height: "30px",
    backgroundImage: "url(../heart-2.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
};

export default App;
