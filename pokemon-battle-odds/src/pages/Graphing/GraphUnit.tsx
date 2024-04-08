// React Imports
import React, {useEffect, useState} from 'react';

// MUI Imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import {styled, useTheme} from "@mui/material/styles";

// D3 Import
// @ts-ignore
import * as d3 from "d3";

// Custom Imports
import {
    Checkbox,
    Fab,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem, OutlinedInput,
    Select,
    Slider, Switch
} from "@mui/material";
import Graph from "./Graph";
import {useToggle} from "../../hooks/useToggle";
import ListItemText from "@mui/material/ListItemText";

const GraphUnitContainer = styled(FormControl)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    border: `3px solid black`,
    borderRadius: "20px",
    backgroundColor: theme.palette.background.default,
    margin: "1vh 1vw 1vh 1vw",
    padding: "0 5px 10px 5px",
    minWidth: "400px",
    flexGrow: 2,
}));

const Controls = styled(Box)(({theme}) => ({
    padding: "10px",
    display: "flex",
    flexShrink: 2,
    minHeight: "0"
}));

const SliderBoxBox = styled(Box)(({theme}) => ({
    padding: "10px",
    height: "100%",
    minWidth: "20%",
    display: "flex",
    flexDirection: "column",
}));

const ToggleBoxBox = styled(Box)(({theme}) => ({
    padding: "10px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
}));

const SelectionBox = styled(Box)(({theme}) => ({
    // height: "100%",
    display: "inline-grid",
    flexGrow: 2,
    flexDirection: "column",
}));

const CustomDropdown = styled(FormControl)(({theme}) => ({
    padding: "10px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    '& .MuiFormControl-root-indicator': {
        borderColor:'black'
    },
    '& .MuiFormControl-root.MuiInputBase-root': {
        borderColor:'black'
    },
    '& MuiTypography-root.MuiTypography-body1.MuiListItemText-primary': {
        // background: "pink",
        color:'black'
    }
}));


interface Props {
    data : any,
    traits: string[],
    windowNum : number,
    closeWindow: (window : number) => void,
    brushRestrictions: any,
    setBrushRestrictions: any,
}

const GraphUnit = (props : Props) => {
    // const navigate = useNavigate(); // use for page navigation later
    const theme = useTheme();
    const [generationSliderValue, setGenerationSliderValue] = useState<number[]>([1, 7]);
    const [xValue, setXValue] = useState<string>("attack");
    const [yValue, setYValue] = useState<string>("speed");
    const [xLabel, setXLabel] = useState<string>("Attack");
    const [yLabel, setYLabel] = useState<string>("Speed");
    const [primaryTrait, setPrimaryTrait] = useState<string[]>([]);
    const [secondaryTrait, setSecondaryTrait] = useState<string[]>([]);
    const {state : isLegendary, toggle : toggleIsLegendary} = useToggle(false);
    const {state : isNotLegendary, toggle : toggleIsNotLegendary} = useToggle(false);
    const {state : isColorCodedByPrimary, toggle : toggleIsColorCodedByPrimary} = useToggle(false);

    const axisValues : {name: string, value : string}[] = [
        {
            name: "Attack",
            value: "attack"
        },
        {
            name: "Special Attack",
            value: "sp_attack"
        },
        {
            name: "Special Defense",
            value: "sp_defense"
        },
        {
            name: "Defense",
            value: "defense"
        },
        {
            name: "Speed",
            value: "speed"
        },
        {
            name: "HP (Health Points)",
            value: "hp"
        },
        {
            name: "Egg Steps",
            value: "base_egg_steps"
        },
        {
            name: "Base Happiness",
            value: "base_happiness"
        },
        {
            name: "Base Total",
            value: "base_total"
        },
        {
            name: "Capture Rate",
            value: "capture_rate"
        },
        {
            name: "Experience Growth",
            value: "experience_growth"
        },
        {
            name: "Height (m)",
            value: "height_m"
        },
        {
            name: "Percentage Male",
            value: "percentage_male"
        },
        {
            name: "Pokédex Number",
            value: "pokedex_number"
        },
        {
            name: "Weight (kg)",
            value: "weight_kg"
        },
    ]

    const handleGenerationSliderChange = (event: Event, newValue: number | number[]) => {
        setGenerationSliderValue(newValue as number[]);
    };

    const handlePrimaryTraitChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setPrimaryTrait(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    }

    const handleSecondaryTraitChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setSecondaryTrait(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    }

    const handleXValueChange = (event : any) => {
        setXValue(event.target.value);
    }

    useEffect(()=>{
        for (let i = 0; i < axisValues.length; i++) {
            if (axisValues[i].value === xValue) {
                setXLabel(axisValues[i].name);
            }
        }
    },[axisValues, xValue])

    const handleYValueChange = (event : any) => {
        setYValue(event.target.value);
    }

    useEffect(()=>{
        for (let i = 0; i < axisValues.length; i++) {
            if (axisValues[i].value === yValue) {
                setYLabel(axisValues[i].name);
            }
        }
    },[axisValues, yValue])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <GraphUnitContainer>
            <Fab
                size={"small"}
                sx={{
                    position: "absolute",
                    right: -20,
                    top: -20,
                    background: theme.palette.primary.main,
                }}
                onClick={()=>{
                    props.closeWindow(props.windowNum);
                }}
            >
                X
            </Fab>
            <Controls>
                {/*Slider*/}
                <SliderBoxBox>
                    <Typography>
                        Generation Selector
                    </Typography>
                    <Slider
                        value={generationSliderValue}
                        onChange={handleGenerationSliderChange}
                        valueLabelDisplay="auto"
                        marks={d3.range(7).map((val : number)=>{
                            return {value : val + 1, label : `${val + 1}`}
                        })}
                        step={1}
                        max={7}
                        min={1}
                    />
                    <Typography sx={{fontStyle: "italic"}} variant={"subtitle1"}>Hover and click data</Typography>

                </SliderBoxBox>

                {/*Toggles*/}
                <ToggleBoxBox>
                    <FormControlLabel control={
                        <Switch
                            size="small"
                            value={isColorCodedByPrimary}
                            checked={isColorCodedByPrimary}
                            onChange={toggleIsColorCodedByPrimary}
                        />
                    } label="Colored by Primary" />
                    <FormControlLabel control={
                        <Checkbox
                            disabled={isNotLegendary}
                            checked={isLegendary}
                            size={"small"}
                            onChange={toggleIsLegendary}
                        />
                    } label="Only Legendary" />
                    <FormControlLabel control={
                        <Checkbox
                            disabled={isLegendary}
                            checked={isNotLegendary}
                            size={"small"}
                            onChange={toggleIsNotLegendary}
                        />
                    } label="Only Non-Legendary" />
                </ToggleBoxBox>

                <SelectionBox>
                    {/*Y-Axis dropdown*/}
                    <CustomDropdown size={"small"}>
                        <InputLabel>Y-Axis</InputLabel>
                        <Select
                            value={yValue}
                            onChange={handleYValueChange}
                        >
                            {
                                axisValues.map((option)=>{
                                    return <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                                })
                            }
                        </Select>
                    </CustomDropdown>

                    {/*X-Axis dropdown*/}
                    <CustomDropdown size={"small"}>
                        <InputLabel>X-Axis</InputLabel>
                        <Select
                            value={xValue}
                            // label="X-Axis"
                            onChange={handleXValueChange}
                        >
                            {
                                axisValues.map((option)=>{
                                    return <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                                })
                            }
                        </Select>
                    </CustomDropdown>
                </SelectionBox>

                <SelectionBox>
                    {/*Primary Trait dropdown*/}
                    <CustomDropdown size={"small"}>
                        <InputLabel>Primary Trait</InputLabel>
                        <Select
                            multiple
                            value={primaryTrait}
                            onChange={handlePrimaryTraitChange}
                            input={<OutlinedInput sx={{textOverflow: "ellipsis"}} label="Primary" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {props.traits.map((trait : any) => {
                                return (
                                <MenuItem key={trait} value={trait}>
                                    <Checkbox checked={primaryTrait.indexOf(trait) > -1} />
                                    <ListItemText primary={trait} />
                                </MenuItem>
                            )})}
                        </Select>
                    </CustomDropdown>

                    {/*Secondary Trait dropdown*/}
                    <CustomDropdown size={"small"}>
                        <InputLabel>Secondary Trait</InputLabel>
                        <Select
                            multiple
                            value={secondaryTrait}
                            onChange={handleSecondaryTraitChange}
                            input={<OutlinedInput label="Secondary" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            sx={{
                                '& #MuiSelect-select': {
                                    width: "auto",
                                    whiteSpace: 'normal',
                                    textOverflow: "ellipsis"
                                },
                            }}
                        >
                            {props.traits.map((trait : any) => {
                                return (
                                    <MenuItem key={trait} value={trait}>
                                        <Checkbox checked={secondaryTrait.indexOf(trait) > -1} />
                                        <ListItemText sx={{textOverflow: "ellipsis"}} primary={trait} />
                                    </MenuItem>
                                )})}
                        </Select>
                    </CustomDropdown>
                </SelectionBox>
            </Controls>
            <Divider sx={{width: "95%", alignSelf: "center"}}/>
            <Graph
                data={props.data}
                xValue={(d : any)=>d[xValue]}
                yValue={(d : any)=>d[yValue]}
                colorByPrimaryType={isColorCodedByPrimary}
                generationFilter={generationSliderValue}
                primaryTypeFilterList={primaryTrait}
                secondaryTypeFilterList={secondaryTrait}
                isLegendary={isLegendary}
                isNotLegendary={isNotLegendary}
                xLabel={xLabel}
                yLabel={yLabel}
                brushRestrictions={props.brushRestrictions}
                setBrushRestrictions={props.setBrushRestrictions}
                windowNum={props.windowNum}
            />
        </GraphUnitContainer>
    )
}

export default GraphUnit