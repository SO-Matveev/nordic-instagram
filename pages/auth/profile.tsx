import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../app/firebaseApp";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { Alert, TextField } from "@mui/material";
import { ChangeEvent } from "react";

const Profile = () => {
  const [user] = useAuthState(auth);
  const docRef = doc(db, "users", String(user?.uid));
  const [userProfile] = useDocumentData(docRef);

  if (!user || !userProfile) {
    return (
      <div>
        <Alert sx={{ mt: 2 }} severity="info">
          Вы не авторизованы <Link href="/auth/login">Войдите.</Link>;
        </Alert>
      </div>
    );
  }
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateDoc(docRef, {
      name: event.target.value,
    });
  };
  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>ID: {user?.uid}</p>
      {userProfile && (
        <div>
          <TextField
            id="standard-basic"
            label="Имя"
            variant="standard"
            value={userProfile.name}
            onChange={handleNameChange}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
