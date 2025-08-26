import gabrielImg from '../assets/gabriel.png';
import TexInput from '../components/TexInput.jsx';
import Tweet from '../components/Tweet.jsx';
import style from './index.module.css';
import { useIndex } from '../hooks/userIndex.page.js';

export default function Index() {
  const {
    text, 
    maxLength, 
    tweetList, 
    onTextChange, 
    sendTweet
    } = useIndex();

  return (
    <div>
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
          <li className={style.tweetListItem}>
            <Tweet tweet={tweet}/>
            </li>
        )
        })}
      </ul>
    </div>
  );
}