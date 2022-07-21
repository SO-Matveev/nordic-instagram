import { NextPage } from "next";
import Link from "next/link";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { signOut } from "firebase/auth";
import { auth } from "../../app/firebaseApp";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

type FormData = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const [user] = useAuthState(auth);
  const [signInWithEmailAndPassword, , , error] =
    useSignInWithEmailAndPassword(auth);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    signInWithEmailAndPassword(data.email, data.password);
  });

  if (user) {
    return (
      <div>
        <div>Вы вошли как {user.email}</div>
        <Button onClick={() => signOut(auth)}> Выйти</Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Авторизация</h1>
      <TextField
        {...register("email")}
        type="email"
        sx={{ mb: 2 }}
        fullWidth
        label="Ваш email"
      />
      <TextField
        {...register("password")}
        type="password"
        sx={{ mb: 2 }}
        fullWidth
        label="Пароль"
      />
      <Button type="submit" variant="contained" fullWidth>
        Войти в Nordic Instagram
      </Button>
      {error && (
        <Alert sx={{ mt: 2 }} severity="error">
          {error?.code === "auth/wrong-password" &&
            "Пароль введен неверно,повторите пароль."}
          {error?.code === "auth/user-not-found" && "Аккаунт не найден."}
        </Alert>
      )}
      <Alert sx={{ mt: 2 }} severity="info">
        Еще нет аккаунта? <Link href="/auth/register">Зарегистрируйтесь</Link>
      </Alert>
    </form>
  );
};

export default Login;
