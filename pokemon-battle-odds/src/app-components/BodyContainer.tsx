// MUI Imports
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";

const BodyContainer = styled(Box)(({theme}) => ({
    flexGrow: 2,
    padding: "20px",
    backgroundColor: theme.palette.background.default,
    height: "calc(100% - 64px)",
    width: "100%",
    position: "relative"
}));

export default BodyContainer;