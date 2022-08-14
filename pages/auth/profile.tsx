import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { Alert, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import useUserProfile from "../../helpers/useUserProfile";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage, db } from "../../app/firebaseApp";
import { ref, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const { userProfile, userRef } = useUserProfile();
  const [uploadFile, uploading] = useUploadFile();

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
  const handlePhotoProfileAdd = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const photoProfileRef = ref(storage, `${event.target.files[0].name}`);
      const result = await uploadFile(photoProfileRef, event.target.files[0]);
      if (result) {
        const photoProfileURL = await getDownloadURL(result?.ref);
        updateDoc(userRef, {
          photoProfile: photoProfileURL,
        });
      }
    }
  };

  return (
    <Paper elevation={2} className="cv__paper">
      <h1>Профиль пользователя</h1>
      <Avatar
        alt="photo"
        src={userProfile.photoProfile}
        sx={{ width: 150, height: 150 }}
      />
      <h2>
        {userProfile.name}
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          disabled={uploading}
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handlePhotoProfileAdd}
          />
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
