import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, Button, AppBar, Toolbar, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
// import Logo from '../../components/Logo';

import { useSelector } from "react-redux";

// 로그인 기능 구현 후 삭제 예정
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reducers/AuthReducer";
import { useEffect } from "react";
import { nominalTypeHack } from "prop-types";

//Icons
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// 헤더 화면 (상단 메뉴바)
const DashboardNavbar = () => {
  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    backgroundColor: alpha(theme.palette.background.default, 0.72),

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }));

  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    maxWidth: 1400,
    minWidth: 1400,
  }));

  /**
   * HSH | 2022.03.14 | v1.0
   * @name LogoStyle
   * @des 헤더에서 사용하는 LOGO CSS 정의
   */
  const LogoStyle = styled(Box)(() => ({
    color: "#111111",

    font: '1.8em "Fira Sans", sans-serif',
    fontWeight: 600,
    textDecoration: "none",

    "&:hover": {
      cursor: "pointer",
    },
  }));

  /**
   * HSH | 2022.03.14 | v1.0
   * @name ButtonStyle
   * @des 헤더에서 사용하는 버튼 CSS 정의
   */
  const ButtonStyle = styled(Button)(() => ({
    color: "#111111",

    "&:hover": {
      background: "none",
    },
  }));

  /**
   * HSH | 2022.03.14 | v1.0
   * @name onClickLogin
   * @des 로그인 클릭시 실행 버튼
   */
  const onClickLogin = () => {
    console.log("onClick Login");

    /**
     * HACK
     * 임시 로그인 기능. 로그인 기능 구현 후 삭제 예정
     */
    dispatch(
      setToken({
        token: "",
        user_id: "id",
        user_nickName: "nickName",
        status: "",
        user_code: "",
        code_name: "",
      })
    );
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box
          sx={{
            px: 2.5,
            py: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <HomeIcon sx={{ fontSize: 30, color: "#111111", margin: "0 10px" }} />
          <LogoStyle to="/main" component={RouterLink}>
            OTL
          </LogoStyle>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 6.5 }}
          sx={{ mr: 10 }}
        >
          <ButtonStyle
            to="/items"
            size="large"
            sx={{ fontSize: 17 }}
            component={RouterLink}
          >
            LIST
          </ButtonStyle>
          <ButtonStyle
            to="/register"
            size="large"
            sx={{ fontSize: 17 }}
            component={RouterLink}
          >
            CREATE
          </ButtonStyle>
          {!user.user_id && (
            <ButtonStyle
              onClick={onClickLogin}
              size="large"
              sx={{ fontSize: 17 }}
            >
              LOGIN
            </ButtonStyle>
          )}
          {user.user_id && (
            <Grid display="flex" direction="row" justifyItems="center" alignItems= "center">
              <ButtonStyle
                to="/whosart"
                size="large"
                sx={{ fontSize: 17 }}
                component={RouterLink}
              >
                {user.user_nickName}
              </ButtonStyle>
              <KeyboardArrowDownIcon
                sx={{ fontSize: 30, color: "#111111", margin: "0 10px" }}
              />
            </Grid>
          )}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default DashboardNavbar;
