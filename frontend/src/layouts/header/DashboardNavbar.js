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

import { useState, useEffect } from "react";
import { nominalTypeHack } from "prop-types";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setInit } from "../../redux/reducers/UserReducer";
import { setValue } from "../../redux/reducers/SearchReducer";
import { setSearchinit } from "../../redux/reducers/SearchReducer";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

/**
 * LDJ, HSH | 2022.03.22 | Update
 * @name SearchNavbar
 * @api -
 * @des 상단 헤더 메뉴바, CSS[소현]
 * @des Redux를 통한 로그인 유무 확인 / 우상단 로그인/프로필 아이콘 전환 [동준]
 */

const SearchNavbar = () => {
  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  const SearchData = useSelector((state) => state.Search.data.searchValue);
  const [inputValue, setInputValue] = useState(SearchData);

  const onChangeSerchValue = (e) => {
    setInputValue(e.target.value);
  };

  // useEffect(() => {
  //   dispatch(setValue(""));
  // });

  // const onClickSearch = () => {
  //   dispatch(setValue(inputValue));
  // };

  const onClickSearch = () => {
    dispatch(setSearchinit());
  };

  useEffect(() => {
    dispatch(setValue(inputValue));
    console.log(inputValue);
  }, [inputValue]);

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

  const LogoStyle = styled(Box)(() => ({
    color: "#111111",

    font: '1.8em "Fira Sans", sans-serif',
    fontWeight: 600,
    textDecoration: "none",

    "&:hover": {
      cursor: "pointer",
    },
  }));

  const ButtonStyle = styled(Button)(() => ({
    color: "#111111",

    "&:hover": {
      background: "none",
    },
  }));

  const onClickLogOut = () => {
    dispatch(setInit());
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const rootStyle = {
    background: "none",
    boxShadow: "none",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };

  const toolbarStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    width: 1400,
    height: 100,
  };

  const UserNickNameStyle = styled(Typography)(() => ({
    color: "#111111",
    fontSize: 17,
    padding: "0 5px",
  }));

  const UserBoxStyle = {
    width: "50px",
  };

  return (
    <AppBar sx={rootStyle}>
      <Toolbar sx={toolbarStyle}>
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

              border: "2px solid #f1f1f1",
              padding: "0 10px",
            }}
          >
            <InputBase
              value={inputValue}
              onChange={onChangeSerchValue}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Item"
            />
            <IconButton
              onClick={onClickSearch}
              sx={{ p: "10px" }}
              aria-label="search"
              to="/search"
              component={RouterLink}
            >
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
            to="/RegisterItem"
            size="large"
            sx={{ fontSize: 17 }}
            component={RouterLink}
          >
            CREATE
          </ButtonStyle>
          {!user.user_address && (
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
          {user.user_address && (
            <div style={UserBoxStyle}>
              <Tooltip title="Open User Menu">
                <IconButton onClick={handleClick} sx={{ p: 0 }}>
                  <Avatar src="{user.user_image_url}"></Avatar>
                  <UserNickNameStyle>{user.user_nickname}</UserNickNameStyle>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "50px", ml: "550px" }}
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
                {!user.user_nickname && (
                  <MenuItem to="/createprofile" component={RouterLink}>
                    <ListItemIcon>
                      <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Profile</Typography>
                  </MenuItem>
                )}
                {user.user_nickname && (
                  <MenuItem to="/main" component={RouterLink}>
                    <ListItemIcon>
                      <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography>Profile</Typography>
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={onClickLogOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography>Log Out</Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default SearchNavbar;
