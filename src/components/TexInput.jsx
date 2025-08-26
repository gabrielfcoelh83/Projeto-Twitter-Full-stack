import { useState } from 'react';
import styles from './TextInput.module.css';

export default function TexInput({ placeholder, maxLength, ...props }) {
  const [text, setText] = useState("");
  const [tweetList, setTweetList] = useState([]);

  function onTextChange(event) {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  }

  function sendTweet(event) {
    setTweetList([...tweetList, text]);
  }

  return (
    <div onSubmit={sendTweet}>
      <textarea
        className={styles.input}
        placeholder={placeholder}
        maxLength={maxLength}
        value={text}
        onChange={onTextChange}
        {...props}
      />
      <p>{text.length} / {maxLength}</p>
      <button on onClick={sendTweet}>Enviar</button>
      {tweetList.map(tweet => {
        return (
          <p>{tweet}</p>
        )
      })}
      
    </div>
  );
}

