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
                <h1 tabIndex={0}>Project Rationale and Goals:</h1>
                <p tabIndex={0}>Our project incorporates a range of features that function as powerful exploratory tools, enabling users to delve 
                into the intricacies of Pokémon data and derive meaningful insights. These features are designed to facilitate 
                a dynamic and engaging exploration of the dataset:</p>
                <strong tabIndex={0}>Overview Page:</strong> <br></br>
                <p tabIndex={0}>Users have the ability to add graphs and dynamically choose the x and y axes, offering a customizable and interactive experience. 
                By selecting specific data points on one graph, users can instantaneously observe the impact on other graphs, fostering a holistic 
                exploration of relationships within the dataset. <br/>
                The ability to select a box within a graph allows users to filter data, focusing their exploration on specific subsets of Pokémon. 
                This feature aids in isolating and analyzing particular characteristics or trends, enhancing the user's ability to discern patterns 
                and correlations within the data.</p>
                <strong tabIndex={0}>Individual Pokémon Pages:</strong> <br/>
                <p tabIndex={0}>Dedicated pages for each Pokémon provide users with histograms, offering a visual representation of fight statistics.
                This feature enables users to explore the distribution of specific attributes, allowing for a detailed examination of the variability 
                within a particular Pokémon's performance metrics. </p>
                <strong tabIndex={0}>Search Page: </strong><br/>
                <p tabIndex={0}> The search functionality serves as a quick and efficient tool for users to locate and explore individual Pokémon statistics. </p>
                <strong tabIndex={0}>Balance Scale:</strong> <br/>
                <p tabIndex={0}>The balance scale feature serves as a unique exploratory tool, allowing users to compare the weights of different Pokémon types in 
                a fun and intuitive manner.</p>
                
                <h1 tabIndex={0}>Credits:</h1>
                <strong tabIndex={0}>Data Sources:</strong><br></br>
                <MuiLink tabIndex={0} href="https://www.kaggle.com/datasets/rounakbanik/pokemon">
                Pokémon Stats Data
            </MuiLink>
            <br />
            <MuiLink tabIndex={0} href="https://www.kaggle.com/datasets/tuannguyenvananh/pokemon-dataset-with-team-combat?select=combats.csv">
                Pokémon Battle Data
            </MuiLink>
            <br />
            <MuiLink tabIndex={0} href="https://www.kaggle.com/datasets/hlrhegemony/pokemon-image-dataset">
                Pokémon Image Data
            </MuiLink>
            <br />
            <strong tabIndex={0}>Icon Credit:</strong>
            <br />
            <MuiLink tabIndex={0} href="https://www.pngall.com/pokeball-png/" title="pokemon icons">
                Pokeball image from scale page
            </MuiLink> <br />
            <strong tabIndex={0}>Styled Text Credit:</strong>
            <br />
            <MuiLink tabIndex={0} href="https://www.font-generator.com/fonts/PokemonGB/" title="pokemon game text">
                Text on the home screen
            </MuiLink > <br /> <br />
                <strong tabIndex={0}>Team Members:</strong> <br></br>
                <p tabIndex={0}>Cade Dillon, Daniel Johnson, Kevin Mason, Caitlyn Rawlings</p><br></br>
                <br/>
                <br/>
            </Typography>
        </Box>
    )
}

export default Rationale