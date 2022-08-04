import { updateDoc } from "firebase/firestore";

import Link from "next/link";
import { Alert, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import useUserProfile from "../../helpers/useUserProfile";

const Profile = () => {
  const { userProfile, userRef } = useUserProfile();

  if (!userProfile) {
    return (
      <div>
        <Alert sx={{ mt: 2 }} severity="info">
          Вы не авторизованы <Link href="/auth/login">Войдите.</Link>;
        </Alert>
      </div>
    );
  }
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateDoc(userRef, {
      name: event.target.value,
    });
  };
  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>ID: {userProfile?.uid}</p>
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
