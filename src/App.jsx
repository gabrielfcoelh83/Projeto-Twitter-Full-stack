  import TextInput from "./components/TexInput.jsx"
  
  function App() { 
    return (
      <div>
        <TextInput placeholder={"O que está acontecendo"} maxLength={125} />
        <TextInput placeholder={"Diga-me uma novidade"} maxLength={250}  />
        <TextInput placeholder={"Diga-me uma novidade"} maxLength={250} value={"Qualquer coisa"} />
      
      </div>
    )
  }
 
export default App
