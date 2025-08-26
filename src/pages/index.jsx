import gabrielImg from '../assets/gabriel.png';
import TexInput from '../components/TexInput.jsx';

export default function Index() {
  return (
    <div>
      <h1>Treina Twitter</h1>
      <div> 
        <img src={gabrielImg} alt="Gabriel" />
        <TexInput placeholder="O que está acontecendo?" maxLength={125} />
      </div>
      <div>
        <div>0 / 125</div>
        <button>Tweetar</button>
      </div>
      <ul>
        <li>Tweet 1</li>
        <li>Tweet 2</li>
      </ul>
    </div>
  );
}