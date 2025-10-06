import { useState } from 'react';
import gabrielImg from '../assets/gabriel.png';
import TexInput from '../components/TexInput.jsx';
import Tweet from '../components/Tweet.jsx';
import style from './index.module.css';
import { useIndex } from '../hooks/userIndex.page.js';

export default function Index() {
  const [theme, setTheme] = useState('light');
  const {
    text, 
    maxLength, 
    tweetList, 
    onTextChange, 
    sendTweet
    } = useIndex();

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div>
      <button
      className={style.postButton}
      onClick={toggleTheme} 
      style={{marginBottom: 16}}>
        Mudar tema
      </button>
      <h1>Treina Twitter</h1>
      <hr className={style.divider} />
      <div className={style.topTweetContainer}>
        <img className={style.avatar} src={gabrielImg} alt="Gabriel" />
        <div className={style.inputArea}>
          <TexInput
            placeholder={"O que está acontecendo?"}
            maxLength={125}
            onChange={onTextChange}
            value={text}
          />
          <div className={style.buttonArea}>
            <div>{text.length} / {maxLength}</div>
            <button
              onClick={sendTweet}
              className={style.postButton}
              disabled={text.length === 0}
            >
              Tweetar
            </button>
          </div>
        </div>
      </div>
      <ul className={style.tweetList}>
        {tweetList.map(tweet => {
        return (
         <li key={tweet.id} className={style.tweetListItem}>
        <Tweet tweet={tweet}/>
        </li>
        )
        })}
      </ul>
    </div>
  );
}