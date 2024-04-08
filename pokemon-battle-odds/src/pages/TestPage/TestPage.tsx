// React Imports
import React, { useEffect, useRef, useState } from 'react';
// import {useNavigate} from 'react-router-dom';

// MUI Imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// D3 Import
// @ts-ignore
import * as d3 from 'd3';

const TestPage = () => {

    const typeColor = new Map();
    typeColor.set("bug", "#818c61");
    typeColor.set("flying", "#ad9cdb");
    typeColor.set("normal", "#d1d1d1");
    typeColor.set("poison", "#58317a");
    typeColor.set("dark", "#262626");
    typeColor.set("fighting", "#8f3306");
    typeColor.set("ground", "#bf8600");
    typeColor.set("psychic", "#d63382");
    typeColor.set("rock", "#694a02");
    typeColor.set("steel", "#808080");
    typeColor.set("water", "#0051d4");
    typeColor.set("dragon", "#391dc4");
    typeColor.set("ghost", "#3f314f");
    typeColor.set("grass", "#40a13f");
    typeColor.set("ice", "#80edeb");
    typeColor.set("electric", "#f2e30c");
    typeColor.set("fairy", "#e8a2c4");
    typeColor.set("fire", "#f58905");
    typeColor.set("unknown", "#000000");

    const graphRef = useRef(null);
    const [potato, setPotato] = useState<String>("i am a potato");

    const myUpdateFunc = () => {
        console.log("mounted");
        // creating an svg for the legend by selecting the reference to the box that we want the svg in
        // we start by selecting the box, then using .data() to bind data to the svg
        //      - .data takes an array of length 1, for the 1 svg
        //      - doesn't matter whats inside the array
        //      - .join("svg") adds the "svg" if it's not there, and updates it otherwise
        const svgLegend : any = d3
            .select(graphRef.current)
        //     .data([null])
        //     .join("svg")
            .attr("height", 1150)
            .attr("width", 1150)
            // .append("g");

        const placeRect = (d : any, i : any) => {
            const x = i * 60 + 5;
            const y = 10;
            return `translate(${x},${y})`;
        }

        const chooseColor = (name : any) => {
            return typeColor.get(name);
        }

        //.select("rect") represents the set of rectangles in the svg
        svgLegend
            .selectAll("g.g-legend-rectangles")
            .data(typeColor.keys())
            .join("g")
            .attr("class", "g-legend-rectangles")
            .append("rect")
            .attr("class", "legend-rectangles")
            .attr("width", 55)
            .attr("height", 31)
            .attr("rx", 5)
            .attr("stroke", "black")
            .attr("fill", chooseColor)
            .attr("transform", placeRect);

        svgLegend
            .selectAll("g.g-legend-rectangles")
            .append("text")
            .text((d: any, i: any) => {return d})
            .attr("x", (d: any, i: any) => {return i * 60 + 32})
            .attr("text-anchor", "middle")
            .attr('dy', '2.5em')
            .attr("font-size", "12")
            .attr("font-weight", "bold")
            .attr("fill", "white");

        return () => {
            console.log("unmount");
        };
    }

    // hook - function that manages a state and away to manipulate the state
    //      - has to have "use" in the first part of the name of the hook
    // 

    // useEffect - for any useState() variables listed in the bracket, anytime the variable's state changes, or 
    //              the TestPage component mounts, the myUpdateFunc will run 
    //          - it will run everything except the return statement inside the myUpdateFunc, which
    //              only runs on unmount
    //          -mount means the component renders (you go to the page)
    //          -unmount means you left the page and the component went away
    //          Strict mode is used to mount/unmount and mount again, to test functionality
    useEffect (myUpdateFunc, []); // do function anytime it gets a state update

    // giving this box tag a reference makes it easier to manipulate the box once it mounts
    return (
        <svg ref={graphRef}>
            <Typography>{potato}</Typography>
        </svg>

    )
}

export default TestPage