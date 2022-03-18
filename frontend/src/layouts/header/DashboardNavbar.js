import { alpha, styled, makeStyles } from "@mui/material/styles";
import { Box, Stack, Button, AppBar, Toolbar, Divider } from "@mui/material";
import {
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  ListItemIcon,
  InputBase,
  Paper,
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
import Logout from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

// 헤더 화면 (상단 메뉴바)
const SearchNavbar = () => {
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

    width:1400,
    height:100,
  };

  /**
   * HSH | 2022.03.14 | v1.0
   * @name UserNickNameStyle
   * @des nickName css
   */
  const UserNickNameStyle = styled(Typography)(() => ({
    color: "#111111",
    fontSize: 17,
    padding: "0 5px",
  }));

  /**
   * HSH | 2022.03.14 | v1.0
   * @name UserNickNameStyle
   * @des nickName css
   */
  const UserBoxStyle = {
    width: "50px",
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

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 600,

              border: '2px solid #f1f1f1',
              padding: '0 10px'
            }}
          >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Item" />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

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
            <div style={UserBoxStyle}>
              <ButtonStyle
                to="/connectwallet"
                size="large"
                sx={{ fontSize: 17 }}
                component={RouterLink}
              >
                LOGIN
              </ButtonStyle>
            </div>
          )}
          {user.user_id && (
            <div style={UserBoxStyle}>
              <Tooltip title="Open User Menu">
                <IconButton onClick={handleClick} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp">H</Avatar>
                  <UserNickNameStyle>{user.user_nickName}</UserNickNameStyle>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: "50px", ml: "550px" }}
                // anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem to="#" component={RouterLink}>
                  <ListItemIcon>
                    <HomeIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center" onClick={handleClose}>
                    Profile
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={onClickLogOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Stack>
    </ToolbarStyle>
    </RootStyle>
  );
};

export default SearchNavbar;
