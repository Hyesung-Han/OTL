import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Container, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

const AvatarStyle = styled(Avatar)({
  "&:hover": {
    boxShadow: "2px 5px 5px 2px rgba(225, 223, 214, 1)",
  },
});

ProfileCard.propTypes = {
  product: PropTypes.object,
};

/**
 * CSW | 2022.03.21 | UPDATE
 * @name ProfileCard
 * @des ProfileCard 컴포넌트
 */

export default function ProfileCard({ product }) {
  const { image, nickname, address } = product;
  return (
    <Container>
      <Link
        to={`/home/${address}`}
        color="inherit"
        underline="hover"
        component={RouterLink}
        sx={{ alignItems: "center" }}
      >
        <AvatarStyle
          alt={nickname}
          src={image}
          sx={{ width: 150, height: 150, my: 3, mx: 3 }}
        />
        <Stack spacing={2}>
          <Typography variant="subtitle1" textAlign="center" noWrap>
            {nickname}
          </Typography>
        </Stack>
      </Link>
    </Container>
  );
}
