// React Imports
import React, { useState, useEffect } from 'react';
// import {useNavigate} from 'react-router-dom';

// MUI Imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Custom Imports
import wailord from "../../media/icons/wailord.png"
import BalanceScale from './BalanceScale';
import PokemonList from './PokemonList';

const TheScaleInAllOfItsGlory = () => {
    // const navigate = useNavigate(); // use for page navigation later
    const [leftWeight, setLeftWeight] = useState(0);
    const [rightWeight, setRightWeight] = useState(0);
    const [leftHeight, setLeftHeight] = useState(0);
    const [rightHeight, setRightHeight] = useState(0);
    const [leftNum, setLeftNum] = useState(0);
    const [rightNum, setRightNum] = useState(0);
    const [leftImage, setLeftImage] = useState(null);
    const [rightImage, setRightImage] = useState(null);


    return (
        /*<Box>
            <Typography>Here we want to have a balance scale where the user can drag Pokémon onto and compare them by weight.</Typography>
            <img alt={"The BIGGEST boi"} src={wailord}/>
        </Box>*/
        <Box style={{  overflowX: 'hidden',
                       }}>
            <PokemonList style={{ position: 'absolute', zIndex: '3',  overflowX: 'hidden'}}
                         leftWeightSetter={setLeftWeight} rightWeightSetter={setRightWeight} 
                         leftHeightSetter={setLeftHeight} rightHeightSetter={setRightHeight}
                         leftNumSetter={setLeftNum} rightNumSetter={setRightNum}
                         leftImageSetter={setLeftImage} rightImageSetter={setRightImage}/>
            <BalanceScale style={{ position: 'fixed', marginTop: '0%', marginLeft: '50%', justifyContent: 'center', transform: 'scale(1)', zIndex: '1',  overflowX: 'hidden', paddingBottom: '1%'}}
                          leftWeight={leftWeight} rightWeight={rightWeight}
                          leftHeight={leftHeight} rightHeight={rightHeight}
                          leftNum={leftNum} rightNum={rightNum}
                          leftImage={leftImage} rightImage={rightImage}/>
        </Box>
    )
}

export default TheScaleInAllOfItsGlory