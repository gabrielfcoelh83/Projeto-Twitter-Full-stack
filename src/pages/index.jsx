import gabrielImg from '../assets/gabriel.png';
import TexInput from '../components/TexInput.jsx';
import { useState } from 'react';
import Tweet from '../components/Tweet.jsx';

export default function Index() {
  const [text, setText] = useState("");
  const maxLength = 125;
  const [tweetList, setTweetList] = useState([]);

   function onTextChange(event) {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  }

  function sendTweet(event) {
    event.preventDefault();
    setTweetList([...tweetList, text]);
  }

  return (
    <div>
      <h1>Treina Twitter</h1>
      <div> 
        <img src={gabrielImg} alt="Gabriel" />
        <TexInput placeholder={"O que está acontecendo?"} 
        maxLength={125} 
        onChange={onTextChange} 
        value={text} 
        />
      </div>
      <div>
        <div>{text.length} / {maxLength}</div>
        <button onClick={sendTweet}>Tweetar</button>
      </div>
      <ul>
        {tweetList.map(tweet => {
        return (
          <li><Tweet children={tweet}/></li>
        )
        })}
      </ul>
    </div>
  );
}