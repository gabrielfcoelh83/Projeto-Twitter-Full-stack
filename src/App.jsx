import TexInput from "./components/TexInput.jsx";
import styles from './App.module.css';
  
  function App() { 
    return (
      <div className={styles.appContainer}>
        <TexInput placeholder={"O que está acontecendo"} maxLength={125} />
      </div>
    )
  }
 
export default App
