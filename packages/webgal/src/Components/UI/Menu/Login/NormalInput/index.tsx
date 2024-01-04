import styles from './normalInput.module.scss';
import { INormalInput } from '../LoginInterface';

export const NormalInput = (input: INormalInput) => {
  return (
    <div className={styles.normal_input}>
      <div className={styles.title}>{input.title}</div>
      <input
        className={styles.input}
        type="text"
        value={input.value}
        placeholder={input.placeholder}
        onChange={(event) => input.onChange(event.target.value)}
      />
    </div>
    // <div className={styles.normal_input}>
    //   <div className={styles.title}>密码</div>
    //   <input className={styles.input} type="password" />
    // </div>
  );
};
