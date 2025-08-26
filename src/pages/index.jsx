import gabrielImg from '../assets/gabriel.png';
import TexInput from '../components/TexInput.jsx';
import { useState } from 'react';

export default function Index() {
  const [text, setText] = useState("");
  const maxLength = 125;

   function onTextChange(event) {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
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
        <button>Tweetar</button>
      </div>
      <ul>
        <li>Tweet 1</li>
        <li>Tweet 2</li>
      </ul>
    </div>
  );
}