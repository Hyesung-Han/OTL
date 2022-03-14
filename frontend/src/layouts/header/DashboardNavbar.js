import { alpha, styled, makeStyles } from "@mui/material/styles";
import { Box, Stack, Button, AppBar, Toolbar, Grid } from "@mui/material";
import {
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
// import Logo from '../../components/Logo';

import { useSelector } from "react-redux";
import { useState } from "react";

// 로그인 기능 구현 후 삭제 예정
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reducers/AuthReducer";
import { useEffect } from "react";
import { nominalTypeHack } from "prop-types";

//Icons
import HomeIcon from "@mui/icons-material/Home";

// 헤더 화면 (상단 메뉴바)
const DashboardNavbar = () => {
  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

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

  /**
   * HSH | 2022.03.14 | v1.0
   * @name onClickLogOut
   * @des logOut 이벤트
   */
  const onClickLogOut = () => {
    /**
     * HACK
     * 임시 로그아웃 기능
     */
    dispatch(
      setToken({
        token: "",
        user_id: "",
        user_nickName: "",
        status: "",
        user_code: "",
        code_name: "",
      })
    );

    setAnchorEl(null);
  };

  /**
   * HSH | 2022.03.14 | v1.0
   * @name handleClick
   * @des 메뉴바 open
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * HSH | 2022.03.14 | v1.0
   * @name handleClose
   * @des 메뉴바 close
   */
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  /**
   * HSH | 2022.03.14 | v1.0
   * @name rootStyle
   * @des root css
   */
  const rootStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };

  /**
   * HSH | 2022.03.14 | v1.0
   * @name toolbarStyle
   * @des toolbar css
   */
  const toolbarStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    // minHeight: APPBAR_MOBILE,
    maxWidth: 1400,
    minWidth: 1400,
  };

  return (
    <div style={rootStyle}>
      <div style={toolbarStyle}>
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
            <Box>
              <Tooltip title="Open User Menu">
                <IconButton onClick={handleClick} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp">H</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem to="#" component={RouterLink}>
                  <Typography textAlign="center" onClick={handleClose}>myhome</Typography>
                </MenuItem>
                <MenuItem onClick={onClickLogOut}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default DashboardNavbar;
