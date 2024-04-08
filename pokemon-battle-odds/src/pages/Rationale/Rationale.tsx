// React Imports
import React from 'react';
// import {useNavigate} from 'react-router-dom';

// MUI Imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link as MuiLink } from '@mui/material';

const Rationale = () => {
    // const navigate = useNavigate(); // use for page navigation later

    return (
        <Box>
            <Typography>
                <h3>Project Rationale and Goals:</h3>
                Our project incorporates a range of features that function as powerful exploratory tools, enabling users to delve 
                into the intricacies of Pokémon data and derive meaningful insights. These features are designed to facilitate 
                a dynamic and engaging exploration of the dataset: <br></br>
                <br></br>
                <strong>Overview Page:</strong> <br></br>
                Users have the ability to add graphs and dynamically choose the x and y axes, offering a customizable and interactive experience. 
                By selecting specific data points on one graph, users can instantaneously observe the impact on other graphs, fostering a holistic 
                exploration of relationships within the dataset.<br/>
                The ability to select a box within a graph allows users to filter data, focusing their exploration on specific subsets of Pokémon. 
                This feature aids in isolating and analyzing particular characteristics or trends, enhancing the user's ability to discern patterns 
                and correlations within the data. <br/>
                <strong>Individual Pokémon Pages:</strong> <br/>
                Dedicated pages for each Pokémon provide users with histograms, offering a visual representation of fight statistics.
                This feature enables users to explore the distribution of specific attributes, allowing for a detailed examination of the variability 
                within a particular Pokémon's performance metrics. <br/>
                <strong>Search Page: </strong><br/>
                The search functionality serves as a quick and efficient tool for users to locate and explore individual Pokémon statistics. <br/>
                <strong>Balance Scale:</strong> <br/>
                The balance scale feature serves as a unique exploratory tool, allowing users to compare the weights of different Pokémon types in 
                a fun and intuitive manner. <br/>
                <br/>
                <h3>Credits:</h3>
                <strong>Data Sources:</strong><br></br>
                <MuiLink href="https://www.kaggle.com/datasets/rounakbanik/pokemon">
                Pokémon Stats Data
            </MuiLink>
            <br />
            <MuiLink href="https://www.kaggle.com/datasets/tuannguyenvananh/pokemon-dataset-with-team-combat?select=combats.csv">
                Pokémon Battle Data
            </MuiLink>
            <br />
            <MuiLink href="https://www.kaggle.com/datasets/hlrhegemony/pokemon-image-dataset">
                Pokémon Image Data
            </MuiLink>
            <br />
            <strong>Icon Credit:</strong>
            <br />
            <MuiLink href="https://www.pngall.com/pokeball-png/" title="pokemon icons">
                Pokeball image from scale page
            </MuiLink> <br />
            <strong>Styled Text Credit:</strong>
            <br />
            <MuiLink href="https://www.font-generator.com/fonts/PokemonGB/" title="pokemon game text">
                Text on the home screen
            </MuiLink> <br /> <br />
                <strong>Team Members:</strong> <br></br>
                Cade Dillon, Daniel Johnson, Kevin Mason, Caitlyn Rawlings<br></br>
                <br/>
                <br/>
            </Typography>
        </Box>
    )
}

export default Rationale