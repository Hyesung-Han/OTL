import { Grid, Avatar, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

/**
 * LJA | 2022.03.30 | ADD
 * @name UserProfile
 * @des UserProfile 컴포넌트
 */

export default function UserProfile({ user }) {
  if (!user) return <>로딩</>;
  return (
    <Grid sx={{ textAlign: "-webkit-center" }}>
      <Avatar
        alt="profile image"
        src={user.user_image_url}
        sx={{ mt: 5, width: 200, height: 200 }}
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
