import styles from './TextInput.module.scss';

const TextInput = props => {
  return (
    <input
      type="text"
      {...props}
      className={styles.input}
    />
  );
};

export default TextInput;