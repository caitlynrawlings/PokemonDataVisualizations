// React Imports
import * as React from 'react';
import {useNavigate} from "react-router-dom";

// Custom Imports
import {DrawerHeader, DRAWER_WIDTH} from "./shared-app-components";
import pokeBall from "../media/icons/pokeball.png";
import wailord from "../media/icons/wailord.png"

// MUI Imports
import {styled, Theme, CSSObject, useTheme} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//MUI ICONS
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import ScaleIcon from '@mui/icons-material/Scale';

const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        // backgroundColor: theme.palette.primary.main, // does nothing
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface Props {
    drawerOpen: boolean,
    toggleDrawerOpen: () => void
}

function Sidebar(props: Props) {
    const navigate = useNavigate();

    const sidebarRoutes: { name: string, icon: any, route: () => void }[] = [
        {
            name: "Home", icon: <HomeIcon/>, route: () => {
                navigate("/24wi/final-project/Pokemon-Battle-Odds/");
            }
        },
        {
            name: "Pokémon Graphing", icon: <ScatterPlotIcon/>, route: () => {
                navigate("/24wi/final-project/Pokemon-Battle-Odds/Graphing");
            }
        },
        {
            name: "Pokémon Search", icon: <SearchIcon/>, route: () => {
                navigate("/24wi/final-project/Pokemon-Battle-Odds/Search");
            }
        },
        {
            name: "Pokémon Scale", icon: <ScaleIcon/> , route: () => {
                navigate("/24wi/final-project/Pokemon-Battle-Odds/TheScaleInAllOfItsGlory");
            }
        },
        {
            name: "Rationale", icon: <InfoIcon/>, route: () => {
                navigate("/24wi/final-project/Pokemon-Battle-Odds/Rationale");
            }
        },
        // {
        //     name: "Test Page", icon: <BuildIcon/>, route: () => {
        //         navigate("/24wi/final-project/Pokemon-Battle-Odds/TestPage");
        //     }
        // }
    ];

    const theme = useTheme();

    return (
        <Drawer variant="permanent" open={props.drawerOpen}>
            <DrawerHeader/>
            <Divider/>
            <List sx={{mt: "-1px", height: "100%", backgroundColor: theme.palette.secondary.main}}>
                {sidebarRoutes.map((item) => (
                    <ListItem key={item.name} disablePadding sx={{display: 'block'}} onClick={item.route}>
                        <ListItemButton
                            sx={{
                                // minHeight: 48,
                                justifyContent: props.drawerOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: props.drawerOpen ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                sx={{
                                    opacity: props.drawerOpen ? 1 : 0,
                                    "& .MuiListItemText-primary" : {
                                        color: "white"
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider/>
            </List>
        </Drawer>
    );
}

export default Sidebar
