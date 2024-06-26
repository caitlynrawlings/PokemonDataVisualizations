import {styled} from "@mui/material/styles";

export const DRAWER_WIDTH = 240;

export const DrawerHeader = styled('div')(({ theme }) => ({
    backgroundColor: "black",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));