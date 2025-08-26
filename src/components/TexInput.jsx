import { useState } from 'react';
import styles from './TextInput.module.css';

export default function TexInput(props) {
  const [tweetList, setTweetList] = useState([]);

  function sendTweet(event) {
    setTweetList([...tweetList, text]);
  }

  return (
    <div onSubmit={sendTweet}>
      <textarea
        className={styles.input}
        {...props}
      />
     
      {
      /* <button on onClick={sendTweet}>Enviar</button>
      {tweetList.map(tweet => {
        return (
          <p>{tweet}</p>
        )
      })} */
      }
      
    </div>
  );
}

