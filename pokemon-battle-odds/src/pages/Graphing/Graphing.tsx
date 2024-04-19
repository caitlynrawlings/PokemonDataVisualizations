// React Imports
import React, {useState} from 'react';

// MUI Imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GraphUnit from "./GraphUnit";
import {styled} from "@mui/material/styles";
import {CustomButton} from "../../shared-components/CustomButton";
import Divider from "@mui/material/Divider";
import {useSequenceNum} from "../../hooks/useSequenceNum";
import {useFetchPokemonInfo} from "../../hooks/useFetchPokemonInfo";

const GraphingContainer = styled(Box)(({theme}) => ({
    padding: "10px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
}));

const ButtonContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "right",
    paddingBottom: "1vh",
}));

const GraphContainer = styled(Box)(({theme}) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
}));

const Graphing = () => {
    // const navigate = useNavigate(); // use for page navigation later
    const {data, traits} = useFetchPokemonInfo();
    const {getNewNum, getNewNumArray} = useSequenceNum();
    const [brushRestrictions, setBrushRestrictions] = useState<Map<number, any>>(new Map());
    const [graphWindows, setGraphWindows] = useState<number[]>([-2, -1]);

    // Also removes a brush if it exists since key will be the window number
    const closeWindow = (windowNum : number) => {
        let tempArray = graphWindows.map((item) => item);
        let index = undefined;
        for (let i = 0; i < tempArray.length; i++) {
            if (windowNum === tempArray[i]) {
                index = i;
            }
        }

        if (index !== undefined) {
            tempArray.splice(index, 1);
            setGraphWindows(tempArray);
        }

        let foundExitBrush = false;
        let newBrushRestrictions = new Map();
        brushRestrictions.forEach((val, key) => {
            if (key === windowNum) {
                newBrushRestrictions.set(key, val);
            } else {
                foundExitBrush = true;
            }
        });
        if (foundExitBrush) {
            setBrushRestrictions(newBrushRestrictions);
        }
    }

    const handleBrushing = (windowNum : number, newBrushing : any) => {
        let newBrushRestrictions = new Map();
        brushRestrictions.forEach((val, key) => {
            newBrushRestrictions.set(key, val);
        });
        if (newBrushing.length === 0) {
            newBrushRestrictions.delete(windowNum);
        } else {
            newBrushRestrictions.set(windowNum, newBrushing);
        }
        setBrushRestrictions(newBrushRestrictions);
    }

    const addWindow = () => {
        let tempArray = graphWindows.map((item) => item);
        tempArray.push(getNewNum());
        setGraphWindows(tempArray);
        // setBrushRestrictions(new Map());
    }

    const resetGraphs = () => {
        setBrushRestrictions(new Map());
        setGraphWindows(getNewNumArray(2));
    }

    return (
        <GraphingContainer>
            <Typography tabIndex={0} sx={{pb: "1vh"}} fontSize="50px" variant={"h1"}>Pokémon Generational Strength</Typography>
            {/* <Typography sx={{pb: "1vh"}} variant={"subtitle1"}>
                Data points on the graphs below are individual pokemon
                from generations 1-7 that are laid out to show different
                patterns depending on what the user would like to graph out
                using the given options. This can be used to show interesting
                relationships or choose the Pokemon that best fits your team.
                Use the sidebar to navigate between
                pages which includes: A search page that navigates to individual 
                Pokemon stats, a scale that weighs Pokemon in comparison to each 
                other, and a page that includes our references and short rationale 
                for our project.
            </Typography> */}
            <ButtonContainer>
                <CustomButton onClick={resetGraphs}>Reset Graphs</CustomButton>
                <CustomButton onClick={addWindow}>Add Graph</CustomButton>
            </ButtonContainer>
            <Divider aria-hidden="true" sx={{width: "100%", alignSelf: "center", marginBottom: "10px"}}/>
            <GraphContainer>
                {
                    graphWindows.map((value) => {
                        // @ts-ignore
                        return <GraphUnit
                            traits={traits}
                            data={data}
                            key={value}
                            windowNum={value}
                            closeWindow={closeWindow}
                            brushRestrictions={brushRestrictions}
                            setBrushRestrictions={handleBrushing}
                        />;
                    })
                }
            </GraphContainer>
        </GraphingContainer>
    )
}

export default Graphing