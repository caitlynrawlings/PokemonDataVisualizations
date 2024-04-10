
// React Imports
import React, {useEffect, useRef, useState} from 'react';

// MUI Imports

// D3 Import
// @ts-ignore
import * as d3 from 'd3';
import {styled, useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

interface Props {
    generationFilter: number[],
    primaryTypeFilterList: string[],
    secondaryTypeFilterList: string[],
    isLegendary : boolean,
    isNotLegendary : boolean,
    colorByPrimaryType : boolean,
    data : any,
    xValue : any,
    xLabel : string,
    yValue : any,
    yLabel : string,
    windowNum : number,
    brushRestrictions: Map<number, number[]>,
    setBrushRestrictions: (windowNum : number, newBrushing : number[]) => void,
}

const CustomSvgLeg = styled("svg")(({theme}) => ({
    flexShrink: 1,
    width: "100%",
    maxHeight: "10%"
}));

const CustomSvg = styled("svg")(({theme}) => ({
    flexGrow: 2,
    width: "100%",
    // minHeight: "250px"
}));

const Graph = (props : Props) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const graphRef = useRef(null);
    const legRef = useRef(null);
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);


    const margin = {top : 40, right: 10, bottom: 40, left: 90};
    const size = Math.min(width / 25, height / 15);
    const symbolVal = 0;

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

    const getColor = (type : string) => {
        const color = typeColor.get(type);
        if (color === undefined) {
            return typeColor.get("unknown");
        }
        return color;
    }

    setInterval(() => {
        if (graphRef.current !== null) {
            // @ts-ignore
            setWidth(graphRef.current.clientWidth);
            // @ts-ignore
            setHeight(graphRef.current.clientHeight);
        }
    },300);

    // A function that return TRUE or FALSE according if a dot is in the selection or not
    function isBrushed(brush_coords : any, cx : any, cy : any) {
        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
    }

    // The graph itself using D3
    useEffect(() => {
        // Ensures that the component has mounted
        if (graphRef) {
            // Selects the reference we will attach to the svg rendered by react
            const selection : any = d3.select(graphRef.current);

            // Preps the tooltip
            const tooltip = d3.select("#root")
                .selectAll("div#tooltip")
                .data([null])
                .join("div")
                .attr("id", "tooltip")
                .style("position", "absolute")
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("background", "white")
                .style("border-radius", "2px")
                .style("border-color", "black")
                .style("border-style", "solid")
                .style("padding", "7px")
                .style("left", 0)
                .style("top", 0)
                .style("background-color", "rgba(255, 255, 255, 0.95)")

            tooltip
                .selectAll("img#tooltip-image")
                .data([null])
                .join("img")
                .attr("id", "tooltip-image")
                .attr("src", process.env.PUBLIC_URL + "/pokemon_images/Abra/0.jpg")

            tooltip
                .style("visible", false)
                .style("z-index", "-1")

            // This will allow us to filter the dataset without altering it
            let filteredData = props.data.map((d : any) => {return d});

            // Filtering on legendary
            if (props.isLegendary) {
                filteredData = filteredData.filter((d : any) => {
                    return d.is_legendary;
                })
            }

            // Filtering on not legendary
            if (props.isNotLegendary) {
                filteredData = filteredData.filter((d : any) => {
                    return !d.is_legendary;
                })
            }

            // Filtering on primary type
            if (props.primaryTypeFilterList.length > 0) {
                filteredData = filteredData.filter((d : any) => {
                    for (let i = 0; i  < props.primaryTypeFilterList.length; i++) {
                        if (props.primaryTypeFilterList[i] === d.type1) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            // Filtering on secondary type
            if (props.secondaryTypeFilterList.length > 0) {
                filteredData = filteredData.filter((d : any) => {
                    for (let i = 0; i  < props.secondaryTypeFilterList.length; i++) {
                        if (props.secondaryTypeFilterList[i] === d.type2) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            // Filtering on generation
            filteredData = filteredData.filter((d : any) => {
                for (let i = props.generationFilter[0]; i <= props.generationFilter[1]; i++) {
                    if (i === d.generation) {
                        return true;
                    }
                }
                return false;
            });

            // x-axis scaling function
            const x = d3.scaleLinear()
                .domain(d3.extent(filteredData, props.xValue))
                .range([margin.left, width - margin.right]);

            // y-axis scaling function
            const y = d3.scaleLinear()
                .domain(d3.extent(filteredData, props.yValue))
                .range([height - margin.bottom, margin.top]);
            if (props.brushRestrictions.size !== 0) {
                // Filtering on brush values
                const maxPokedexNum = d3.max(filteredData.map((d: any) => d["pokedex_number"]));
                let brushedPokedexNums = d3.range(maxPokedexNum);
                props.brushRestrictions.forEach((val, key) => {
                    if (key !== props.windowNum) {
                        brushedPokedexNums = brushedPokedexNums.filter((d: any) => {
                            for (let i = 0; i < brushedPokedexNums.length; i++) {
                                if (val[i] === d) {
                                    return true;
                                }
                            }
                            return false;
                        });
                    }
                });

                filteredData = filteredData.filter((d: any) => {
                    for (let i = 0; i <= brushedPokedexNums.length; i++) {
                        if (d.pokedex_number === brushedPokedexNums[i]) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            // data points
            const marks = filteredData.map((d : any) => {
                return {
                    x: x(props.xValue(d)),
                    y: y(props.yValue(d)),
                    primaryColor: getColor(d.type1),
                    info: [
                        d.name,
                        props.xValue(d),
                        props.yValue(d),
                        "Base Stats:",
                        d["hp"],
                        d["attack"],
                        d["defense"],
                        d["sp_attack"],
                        d["sp_defense"],
                        d["speed"],
                        d["base_total"]
                    ],
                    pokedex_number: d["pokedex_number"]
                }
            })

            const longTransition = d3.transition().duration(1000);
            const shortTransition = d3.transition().duration(100);

            // adding data
            selection
                .selectAll("path.point")
                .data(marks, (d : any) => {return d.japanese_name})
                .join(
                    (enter : any) => {

                        enter
                            .append("path")
                            .attr("fill", (d : any) => props.colorByPrimaryType ? d.primaryColor : `${theme.palette.text.primary}`)
                            .attr("transform", (d : any) => `translate(${d.x}, ${d.y})`)
                            .attr("d", d3.symbol().type(d3.symbols[symbolVal]).size(0))
                            .attr("class", "point")
                            .style("opacity", 0.5)
                            .on('mouseover', function(event : any, d : any) {
                                // @ts-ignore
                                d3.select(this)
                                    .transition()
                                    .duration('50')
                                    .attr("d", d3.symbol().type(d3.symbols[symbolVal]).size(size * 7))
                                    .attr("fill", `${theme.palette.primary.main}`)
                                    .attr("stroke", "#000000")
                                    .attr("stroke-width", 3)

                                // Positioning tooltip
                                tooltip
                                    .style("top", `${event.pageY - 370}px`)

                                if (event.pageX > window.innerWidth / 2) {
                                    tooltip
                                        .style("left", `${event.pageX - 210}px`)
                                } else {
                                    tooltip
                                        .style("left", `${event.pageX + 20}px`)
                                }

                                // Adding image to tooltip
                                tooltip
                                    .selectAll("img#tooltip-image")
                                    .data([null])
                                    .join("img")
                                    .attr("id", "tooltip-image")
                                    .attr("src", process.env.PUBLIC_URL + `/pokemon_images/${d.info[0]}/0.jpg`)

                                // Adding info to tooltip
                                tooltip
                                    .selectAll("div.tooltip-text")
                                    .data(d.info)
                                    .join("div")
                                    .classed("tooltip-text", true)
                                    // checking if our data is the title and assign that div a css class that will make it bold
                                    .classed("bold-text", (d : any, i : number) => (i === 0 || i === 3))
                                    .text((d : any, i : number)=>{
                                        switch (i) {
                                            case 0:
                                                return `${d}`;
                                            case 1:
                                                return `x-axis value: ${d}`; // Add label later - has bugs
                                            case 2:
                                                return `y-axis value: ${d}`; // Add label later - has bugs
                                            case 3:
                                                return `${d}`;
                                            case 4:
                                                return `HP (Health Points): ${d}`;
                                            case 5:
                                                return `Attack: ${d}`;
                                            case 6:
                                                return `Defense: ${d}`;
                                            case 7:
                                                return `Special Attack: ${d}`;
                                            case 8:
                                                return `Special Defense: ${d}`;
                                            case 9:
                                                return `Speed: ${d}`;
                                            case 10:
                                                return `Base Total: ${d}`;
                                            default:
                                                return ""
                                        }
                                    });

                                tooltip
                                    .style("z-index", "9999")
                                    .style("visible", true)
                            })
                            .on('mouseout', function(event : any, d : any) {
                                // @ts-ignore
                                d3.select(this)
                                    .transition()
                                    .duration('100')
                                    .attr("d", d3.symbol().type(d3.symbols[symbolVal]).size(size))
                                    .attr("fill", (d : any) => props.colorByPrimaryType ? d.primaryColor : `${theme.palette.text.primary}`)
                                    .attr("stroke", "#ff0000")
                                    .attr("stroke-width", 0)

                                tooltip
                                    .style("visible", false)
                                    .style("z-index", "-1")
                            })
                            .on('click', function(event : any, d : any) {
                                // @ts-ignore
                                navigate(process.env.PUBLIC_URL + `/IndividualPokemon/?filterName=${encodeURIComponent(d.info[0])}`);
                                tooltip
                                    .style("visible", false)
                                    .style("z-index", "-1")
                            })
                            .call(
                                (enter : any) => enter
                                    .attr("d", d3.symbol().type(d3.symbols[symbolVal]).size(size))
                            )
                    },
                    (update : any) => {
                        update
                            // .transition(longTransition) // Looks buggy
                            // .delay((d : any, i : number) => {return i * 5})
                            .attr("d", d3.symbol().type(d3.symbols[symbolVal]).size(size))
                            .attr("transform", (d : any) => `translate(${d.x}, ${d.y})`)
                            .attr("class", "point")
                    },
                    (exit : any) => {
                        exit.remove().transition();
                    }
                )

            // adding axis
            selection
                .selectAll("g.y-axis")
                .data([null]) // since there is only one, it matches it to the existing one if there is or creates one
                .join("g")
                .attr("class", "y-axis")
                .attr("transform", `translate(${margin.left},0)`)
                .transition(shortTransition)
                .call(d3.axisLeft(y));

            selection
                .selectAll("g.y-axis-label")
                .data([null])
                .join("g")
                .attr("class", "y-axis-label")
                .attr("transform", `translate(${margin.left / 3},${height / 1.8 + props.yLabel.length * 4.2 - (props.yLabel.length > 12 && height < 200 ? height / 15: 0)}) rotate(-90)`)
                .selectAll("text.y-axis-label-text")
                .data([null])
                .join("text")
                .classed("y-axis-label-text", true)
                .classed("bold-text", true)
                .style("fill", `${theme.palette.text.primary}`)
                .style("font-size", `${props.yLabel.length > 12 ? Math.min(height / 200, 1.2): 1.2}rem`)
                .text(props.yLabel)
                .transition(shortTransition);

            selection
                .selectAll("g.x-axis")
                .data([null])
                .join("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .transition(shortTransition)
                .call(d3.axisBottom(x));

            selection
                .selectAll("g.x-axis-label")
                .data([null])
                .join("g")
                .attr("class", "x-axis-label")
                .attr("transform", `translate(${width / 2},${height - margin.bottom / 8})`)
                .selectAll("text.x-axis-label-text")
                .data([null])
                .join("text")
                .classed("x-axis-label-text", true)
                .classed("bold-text", true)
                .text(props.xLabel)
                .style("fill", `${theme.palette.text.primary}`)
                .transition(shortTransition);

            selection
                .selectAll("g.graph-title")
                .data([null])
                .join("g")
                .attr("class", "graph-title")
                .attr("transform", `translate(${width / 2 - margin.left},${margin.top / 2})`)
                .selectAll("text.graph-title-text")
                .data([null])
                .join("text")
                .classed("graph-title-text", true)
                .classed("bold-text", true)
                .text(props.yLabel + " vs " + props.xLabel)
                .style("fill", `${theme.palette.text.primary}`)
                .transition(shortTransition);

        selection
            .selectAll("g.brush")
            .data([null])
            .join("g")
            .classed("brush", true)
            .call(d3.brush()
                .extent( [ [0,0], [width,height] ] )       // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
                .on("start end brush", function(event : any, d : any){
                    let extent = event.selection;
                    if (extent === null || extent === undefined) {

                    } else {
                        let newBrush = selection
                            .selectAll("path.point")
                            .data()
                            .filter((d : any) => {
                                return isBrushed(extent, d.x, d.y);
                            }).map((d : any) => {
                                return d.pokedex_number;
                            });
                        props.setBrushRestrictions(props.windowNum, newBrush);
                    }
                })
            )                  // Add the brush feature using the d3.brush function

        }
    }, [props, width, height, theme.palette.text.primary]);

    // Adds in the legend if they user chooses to toggle it on
    useEffect(() => {
        if (legRef) {
            const selection = d3.select(legRef.current);
            const legendSVG: any = selection
                .selectAll("svg.legend-svg")
                .data([null])
                .join("svg")
                .classed("legend-svg", true)
                .attr("x", 0)
                .attr("y", 0)
                // .attr("width", `${width}px`)
                .attr("maxHeight", `${50}px`)
                .attr("viewBox", `0 0 1300 20`);

            const placeRect = (d: any, i: any) => {
                const x = (i + 2) * 60 + 5;
                const y = 10;
                return `translate(${x},${0})`;
            }

            const chooseColor = (name: any) => {
                return typeColor.get(name);
            }

            //.select("rect") represents the set of rectangles in the svg
            legendSVG
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

            legendSVG
                .selectAll("g.g-legend-rectangles")
                .append("text")
                .text((d: any, i: any) => {
                    return d
                })
                .attr("x", (d: any, i: any) => {
                    return (i + 2) * 60 + 32
                })
                .attr("y", -10)
                .attr("text-anchor", "middle")
                .attr('dy', '2.5em')
                .attr("font-size", "12")
                .attr("font-weight", "bold")
                .attr("fill", "white");
        }
    }, [props.colorByPrimaryType])


    return (
        <>
            {props.colorByPrimaryType ? <CustomSvgLeg ref={legRef}></CustomSvgLeg> : <></>}
            <CustomSvg ref={graphRef}/>
        </>

    );
}

export default Graph