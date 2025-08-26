import { useState } from "react";
import gabrielImg from '../assets/gabriel.png';

export function useIndex() {

  const [text, setText] = useState("");
  const maxLength = 125;
  const [tweetList, setTweetList] = useState([]);

  const tweet = {
    date: new Date(),
    text: text,
    user: {
      name: "Gabriel",
      image: gabrielImg,
      username: "gabrielcoelho"
    }
  }

  function onTextChange(event) {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  }

  function sendTweet(event) {
    event.preventDefault();
    setTweetList([...tweetList, tweet]);
  }
  return {
    text, 
    maxLength, 
    tweetList, 
    onTextChange, 
    sendTweet
  };
};

