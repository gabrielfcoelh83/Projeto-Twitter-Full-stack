import styles from './TextInput.module.css';

export default function TexInput(props) {
  return (
    <div>
      <textarea
        className={styles.input}
        {...props}
      />
    </div>
  );
}

