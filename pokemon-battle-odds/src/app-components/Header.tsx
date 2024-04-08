// React Imports
import * as React from "react";

// Custom Imports
import {DRAWER_WIDTH} from "./shared-app-components";
import LOGO from "../media/uw_logo.png";

// MUI Imports
import {styled} from "@mui/material/styles";
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// MUI ICONS
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean,
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    // backgroundColor: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface Props {
    drawerOpen: boolean,
    toggleDrawerOpen: () => void
    darkModeOn : boolean,
    toggleDarkModeOn : () => void
}

function Header(props: Props) {

    const navigate = useNavigate();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.toggleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Box flexGrow={2} sx={{display: "flex", justifyContent: "center"}}>
                    <Box
                        component={"img"}
                        sx={{height: 50}}
                        alt={"UW Logo"}
                        src={LOGO}
                        onClick={() => {
                            navigate("/PokemonDataVisualizations/");
                        }}
                    />
                </Box>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.toggleDarkModeOn}
                    edge="start"
                >
                    {props.darkModeOn ? <LightModeIcon/> : <DarkModeIcon/>}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header
