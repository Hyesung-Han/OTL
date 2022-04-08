import { Grid, Avatar, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

/**
 * LJA | 2022.03.28 | ADD
 * @name MyProfile
 * @des MyProfile 컴포넌트
 */

export default function MyProfile() {
  const user = useSelector((state) => state.User.user);

  return (
    <Grid sx={{ textAlign: "-webkit-center", pb: 1 }}>
      <Avatar
        alt="profile image"
        src={user.user_image_url}
        sx={{ mt: 4, width: 200, height: 200 }}
      />
      <Stack spacing={1} sx={{ mt: 1 }}>
        <Typography variant="h4" textAlign="center" noWrap>
          {user.user_nickname}
        </Typography>
        <Typography
          variant="caption"
          textAlign="center"
          noWrap
          sx={{ fontSize: "0.65rem" }}
        >
          {user.user_address}
        </Typography>
        <Typography variant="subtitle1" textAlign="center" noWrap>
          {user.user_email}
        </Typography>
        <Typography variant="subtitle1" textAlign="center" noWrap>
          {user.user_bio}
        </Typography>
        <Typography variant="subtitle1" textAlign="center" noWrap>
          {user.user_link}
        </Typography>
      </Stack>
    </Grid>
  );
}
