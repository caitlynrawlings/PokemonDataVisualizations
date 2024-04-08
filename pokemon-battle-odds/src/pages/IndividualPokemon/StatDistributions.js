import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const drawStatDistribution = (
  statName,
  stat,
  filteredData,
  overallData,
  navigateToStatFilter
) => {
  const colors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  const opposites = {
    normal: "ghost",
    fire: "water",
    water: "fire",
    electric: "bug",
    grass: "poison",
    ice: "rock",
    fighting: "steel",
    poison: "grass",
    ground: "flying",
    flying: "ground",
    psychic: "dark",
    bug: "electric",
    rock: "ice",
    ghost: "normal",
    dragon: "fairy",
    dark: "psychic",
    steel: "fighting",
    fairy: "dragon",
  };

  // Get the name of the pokemon
  const pokemonName = filteredData[0][30];
  let type1 = filteredData[0][36];
  let type2 = filteredData[0][37];

  if (!type2) {
    type2 = colors[opposites[type1]];
  } else {
    type2 = colors[type2];
  }

  type1 = colors[type1];

  console.log(type1);
  console.log(type2);

  // Define dimensions for the SVG
  const width = 800;
  const height = 600;
  const margin = { top: 50, right: 20, bottom: 80, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Extract the values for the selected stat from filtered and overall datasets
  const filteredValues = filteredData.map((row) => +row[stat]);
  const overallValues = overallData.map((row) => +row[stat]);

  // Compute the maximum value for the x-axis
  let maxValue = d3.max(overallValues);

  if (maxValue % 10 !== 0) {
    maxValue += 10 - (maxValue % 10);
  }

  // Define the epsilon value
  const epsilon = 0.1;
  let bin_span = 10;
  if (stat == 22) {
    bin_span = 20;
  }

  // Define the bins for the histogram
  const bins = d3.range(0, maxValue + 20, bin_span);

  // Add epsilon to each value
  const adjustedOverallValues = overallValues.map((value) => value + epsilon);
  // Add epsilon to each value
  const adjustedIndividualValues = filteredValues.map(
    (value) => value + epsilon
  );

  console.log(adjustedOverallValues);
  console.log(adjustedIndividualValues);

  // Create a histogram generator
  const histogram = d3
    .histogram()
    .domain([0, maxValue + 20])
    .thresholds(bins);

  // Compute the bins for the filtered and overall datasets
  const overallBins = histogram(adjustedOverallValues);

  // Compute the maximum count of Pokémon in a bin to set the y-axis domain
  const maxCount = d3.max(overallBins, (bin) => bin.length);

  // Create scales
  const xScale = d3
    .scaleLinear()
    .domain([0, maxValue + 20])
    .range([margin.left, innerWidth + margin.left]);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxCount])
    .nice()
    .range([innerHeight + margin.top, margin.top]);

  // Create a SVG container
  const svg = d3.select(`#${statName}`);

  // Clear existing content
  svg.selectAll("*").remove();

  // Create a tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("opacity", 0);

  // Draw the histogram for overall distribution
  svg
    .selectAll(`rect.${statName}-overall`)
    .data(overallBins)
    .enter()
    .append("rect")
    .attr("class", `${statName}-overall`)
    .attr("x", (d) => xScale(d.x0))
    .attr("y", (d) => yScale(d.length))
    .attr("width", (d) => xScale(d.x1) - xScale(d.x0) - 1)
    .attr("height", (d) => innerHeight + margin.top - yScale(d.length))
    .attr("fill", (d) =>
      d.some((value) => adjustedIndividualValues.includes(value))
        ? type2
        : type1
    )
    // Add tooltip on mouseover
    .on("mouseover", function (event, d) {
      const binRange = `[${d.x0}, ${d.x1}]`;
      const binCount = d.length;
      d3.select(this).attr("fill", type2); // Highlight the bar on hover
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(
          `<strong>Range:</strong> ${binRange}<br/><strong>Count:</strong> ${binCount}`
        )
        .style("left", `${event.pageX + 50}px`)
        .style("top", `${event.pageY - 50}px`);
    })
    .on("mousemove", function (event) {
      tooltip
        .style("left", `${event.pageX + 50}px`)
        .style("top", `${event.pageY - 50}px`);
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", (d) =>
        d.some((value) => adjustedIndividualValues.includes(value))
          ? type2
          : type1
      ); // Restore the original color on mouseout
      tooltip.transition().duration(500).style("opacity", 0);
    })
    // Inside the event listener for mouse click on histogram bars
    .on("click", function (event, d) {
      const binRange = [d.x0, d.x1];
      const filteredDataset = overallData.filter(
        (row) =>
          row[stat] && row[stat] >= binRange[0] && row[stat] < binRange[1]
      );

      console.log(filteredDataset);
      tooltip.transition().duration(500).style("opacity", 0);
      // Call the callback function to navigate to a new component with filtered dataset
      navigateToStatFilter(filteredDataset, statName, binRange[0], binRange[1]);
    });

  // Draw axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .attr("transform", `translate(0, ${innerHeight + margin.top})`)
    .call(xAxis);

  svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(yAxis);

  // Add X axis label
  svg
    .append("text")
    .attr("class", "x-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height - margin.bottom / 2)
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text(`${statName} Values`);

  // Add Y axis label
  svg
    .append("text")
    .attr("class", "y-axis-label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", margin.left / 2)
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text("Count of Pokemon");

  // Add title
  svg
    .append("text")
    .attr("class", "graph-title")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .style("font-size", "20")
    .style("font-weight", "bold")
    .text(
      `Where Does ${pokemonName} Fall in the ${statName} Distribution for All Pokemon?`
    );
};

const StatDistributions = ({
  statName,
  selectedStat,
  filteredData,
  overallData,
  navigateToStatFilter,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    if (filteredData.length > 0 && overallData.length > 0) {
      // Remove spaces or replace them with hyphen
      const sanitizedStatName = statName.replace(/\s+/g, "-");
      drawStatDistribution(
        sanitizedStatName,
        selectedStat,
        filteredData,
        overallData,
        navigateToStatFilter
      );
    }
  }, [statName, selectedStat, filteredData, overallData, navigateToStatFilter]);

  return (
    <svg
      ref={svgRef}
      id={statName.replace(/\s+/g, "-")}
      width="800"
      height="600"
    ></svg>
  );
};

export default StatDistributions;
