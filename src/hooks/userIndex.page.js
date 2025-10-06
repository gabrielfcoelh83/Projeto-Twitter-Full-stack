import { useState, useEffect } from "react";
import gabrielImg from '../assets/gabriel.png';

export function useIndex() {
  const [text, setText] = useState("");
  const maxLength = 125;
  const [tweetList, setTweetList] = useState([]);

  // Função para buscar tweets na API de backend
  async function fetchTweets() {
    // Pega o token salvo no navegador
    const token = localStorage.getItem('access_token');
    
    if (token) {
      const response = await fetch('http://127.0.0.1:8000/my_tweets', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}` // Adiciona o cabeçalho de autorização
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Mapeia os dados da API para o formato esperado pelo componente Tweet
        const formattedData = data.map(tweet => ({
          date: new Date(), // A data será a data atual
          text: tweet.text,
          user: {
            name: "Gabriel",
            image: gabrielImg,
            username: "gabrielcoelho"
          }
        }));
        setTweetList(formattedData);
      }
    }
  }

  // Use useEffect para buscar os tweets quando o componente for montado
  useEffect(() => {
    fetchTweets();
  }, []);

  function onTextChange(event) {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  }

  async function sendTweet(event) {
    event.preventDefault();
    const token = localStorage.getItem('access_token');
    
    if (token && text) {
      const response = await fetch('http://127.0.0.1:8000/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        setText(""); // Limpa o campo de texto depois de enviar
        fetchTweets(); // Atualiza a lista de tweets
      }
    }
  }
  
  return {
    text, 
    maxLength, 
    tweetList, 
    onTextChange, 
    sendTweet
  };
};