import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";

export const CustomButton = styled(Button)(({theme}) => ({
    color: `${theme.palette.button.restingText}`,
    backgroundColor: `${theme.palette.button.restingBackground}`,
    '&:hover': {
        backgroundColor: `${theme.palette.button.hoverBackground}`,
        color: '#3c52b2',
    },
    margin: "0 1vw 0 1vw"
}));