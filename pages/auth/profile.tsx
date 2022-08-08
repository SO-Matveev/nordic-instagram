import { updateDoc } from "firebase/firestore";

import Link from "next/link";
import { Alert, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import useUserProfile from "../../helpers/useUserProfile";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

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
    <Paper elevation={2} className="cv__paper">
      <h1>Профиль пользователя</h1>
      <Avatar alt="" src="" sx={{ width: 65, height: 65 }} />
      <h2>
        {userProfile.name}
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
          <AddAPhotoIcon />
        </IconButton>
      </h2>
      <p>ID: {userProfile?.uid}</p>
      {userProfile && (
        <TextField
          sx={{ mb: 2 }}
          id="standard-basic"
          label="Изменить имя"
          variant="standard"
          value={userProfile.name}
          onChange={handleNameChange}
        />
      )}
    </Paper>
  );
};

export default Profile;
