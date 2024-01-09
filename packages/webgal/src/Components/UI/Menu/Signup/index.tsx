import { FC, useState } from 'react';
import styles from './options.module.scss';
import useTrans from '@/hooks/useTrans';
import { NormalInput } from './NormalInput';
import { NormalButton } from './NormalButton';
import { useDispatch } from 'react-redux';
import { setVisibility } from '@/store/GUIReducer';

export const Login: FC = () => {
  const t = useTrans('menu.signup.');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const handleChangeUsername = (value: string) => {
    setForm({ ...form, username: value });
  };

  const handleChangePassword = (value: string) => {
    setForm({ ...form, password: value });
  };

  // http://localhost:8080/login
  // 发送请求
  const LoginRequest = async () => {
    // POST请求
    const response = await fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: form.username, password: form.password }),
    });
    const data = await response.json();
    return data;
  };

  const handleSubmit = async (event: any) => {
    console.log('handleSubmit');
    // event.preventDefault();
    if (form.username.length < 6) {
      setError('用户名不少于6字符');
    } else if (form.password.length < 8) {
      setError('密码不少于8字符');
    } else if (!/\d/.test(form.password) || !/[a-zA-Z]/.test(form.password)) {
      setError('密码必须包含字符和数字');
    } else {
      setError('');
      const data = await LoginRequest();
      if (data.code === 200) {
        dispatch(setVisibility({ component: 'showMenuPanel', visibility: false }));
      } else {
        setError(data.msg);
      }
    }
  };

  const handleChangeConfirmPassword = (value: string) => {
    setForm({ ...form, confirmPassword: value });
  };

  return (
    <div className={styles.Options_main}>
      <div className={styles.Options_top}>
        <div className={styles.Options_title}>
          <div className={styles.Option_title_text}>{t('title')}</div>
        </div>
      </div>
      <form>
        <div className={styles.Options_page_container}>
          <NormalInput
            title="用户名"
            placeholder="英文,不少于6字符"
            value={form.username}
            onChange={handleChangeUsername}
          />
          <NormalInput
            title="密码"
            placeholder="数字+字符不少于8字符"
            value={form.password}
            onChange={handleChangePassword}
          />
          <NormalInput
            title="确认密码"
            placeholder="数字+字符不少于8字符"
            value={form.confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
          {form.password !== form.confirmPassword && <div className={styles.Login_error}>两次密码不一致</div>}
          {error && <div className={styles.Login_error}>{error}</div>}
          <NormalButton textList={[t('options.signup')]} functionList={[handleSubmit]} currentChecked={1} />
        </div>
      </form>
    </div>
  );
};
