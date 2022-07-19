import { NextPage } from "next";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { signOut } from "firebase/auth";
import { auth } from "../../app/firebaseApp";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register: NextPage = () => {
  const [user] = useAuthState(auth);
  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(auth);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    createUserWithEmailAndPassword(data.email, data.password);
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
      <h1>Регистрация</h1>
      <TextField
        {...register("name")}
        type="text"
        sx={{ mb: 2 }}
        fullWidth
        label="Ваше имя"
      />
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
        Зарегистрироваться
      </Button>
      {error?.code === "auth/email-already-in-use" && (
        <Alert sx={{ mt: 2 }} severity="error">
          Email уже занят
        </Alert>
      )}
    </form>
  );
};

export default Register;
