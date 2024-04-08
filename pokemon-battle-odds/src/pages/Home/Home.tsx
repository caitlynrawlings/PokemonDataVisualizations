// React Imports
import React from 'react';
// import {useNavigate} from 'react-router-dom';

// MUI Imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import {ListItem} from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

const HomeContainer = styled(Box)(({theme}) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}));

interface Props {
    isDarkMode : boolean
}

const Home = (props : Props) => {

    const graphingFeatures : any = [
        "Generation Filtering",
        "The Ability to Color by Primary Type (with dedicated legend)",
        "Legendary Filtering",
        "Non-Legendary Filtering",
        "15 Different Options for graphing on the X and Y axes",
        "Primary Type Filtering",
        "Secondary Type Filtering",
        "Hoverable data points that show personalized data for every Pokémon",
        "Clickable data points that navigate to pages with more information about every Pokemon",
        "The Ability to Dynamically Add More Graphs to Analyze Relationships Side-by-side"
    ];

    const individualFeatures : any = [
        "Photo of the Pokémon",
        "Pokémon types (primary and secondary)",
        "List of Stats",
        "List of Weakness Modifiers",
        "Interactive Graph that shows the stat distribution for the chosen Pokémon"
    ];

    const individualGraphFeatures : any = [
        "A tooltip that shows the range that a Pokémon is within and how many Pokémon lay within that same range",
        "The ability to choose and analyze any of the main 6 Pokémon stats",
        "The ability to select a section of the distribution and list out the Pokémon in that distribution to explore"
    ];

    return (
        <HomeContainer>
            <Typography sx={{pb: "1vh", textAlign: "center"}} variant={"h3"}>Pokémon Stat and Attribute Exploration Application</Typography>
            <Divider sx={{width: "100%"}}/>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "min(950px, 50vw)",
                    padding: "4vh 0 4vh 0"
                }}
                alt={"Welcome to the World of Pokémon stat and attribute relation exploration!"}
                src={process.env.PUBLIC_URL + "/HelloWorldPokemon.png"}
            />
            <Typography variant={"h5"}>
                Welcome to the World of Pokémon stat and attributes!
            </Typography>
            <Typography variant={"h5"} sx={{padding: "0 0 15vh 0"}}>
                In this application, YOU get to choose how you want to use!
            </Typography>

            {/* Start of Graphing Section*/}
            <Divider sx={{width: "100%"}}/>
            <Typography variant={"h4"} sx={{textAlign: "center", pt: "2vh"}}>
                Are you looking for a Pokémon to join your team?
            </Typography>
            <Typography variant={"h6"}>
                You need a Pokémon with good stats. Stats that YOU care about!
            </Typography>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "min(950px, 50vw)",
                    padding: "4vh 0 4vh 0"
                }}
                alt={"Welcome to the World of Pokémon stat and attribute relation exploration!"}
                src={process.env.PUBLIC_URL + `/${props.isDarkMode ? "GraphingExampleDarkMode" : "GraphingExampleLightMode"}.png`}
            />
            <Typography variant={"h6"} sx={{pb: "3vh"}}>
                Use the graphing page to search for a Pokémon that fits your stat requirements!
            </Typography>
            <Typography variant={"h6"}>
                You can:
            </Typography>
            <List sx={{ listStyleType: 'disc' }}>
                {
                    graphingFeatures.map((val : string)=>
                        <ListItem sx={{display: 'list-item'}}>
                            <ListItemText
                                primaryTypographyProps={{style: {color: props.isDarkMode ? "white" : "black"}}}
                                primary={`${val}`}
                            />
                        </ListItem>
                    )
                }
            </List>
            <Typography variant={"h6"} sx={{padding: "0 0 10vh 0"}}>
                Be it a search for a better Pokémon to add to your team or a desire to graph a relation,
                the user has the power to decide how to use the graph. Try looking into different relationships
                and reason out why they might look the way they do (try speed vs weight).
            </Typography>

            {/* Start of Search Section */}
            <Divider sx={{width: "100%"}}/>
            <Typography variant={"h4"} sx={{textAlign: "center", pt: "3vh"}}>
                Are you looking for searching for a specific Pokémon?
            </Typography>
            <Typography variant={"h6"}>
                Navigate to our search page to look up the stats to your favorite Pokémon!
            </Typography>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "min(950px, 50vw)",
                    padding: "4vh 0 4vh 0"
                }}
                alt={"Welcome to the World of Pokémon stat and attribute relation exploration!"}
                src={process.env.PUBLIC_URL + `/${props.isDarkMode ? "SearchDarkMode" : "SearchLightMode"}.png`}
            />
            <Typography variant={"h6"} sx={{p: "0 0 10vh 0"}}>
                You can get to this page using the navigation on the left or by clicking through
                the interactive graph on the individual Pokémon page!
            </Typography>

            {/* Start of Individual Page Section */}
            <Divider sx={{width: "100%"}}/>
            <Typography variant={"h4"} sx={{textAlign: "center", pt: "4vh"}}>
                Do you want to know what the stats are for your favorite Pokémon?
                Do you also want to know how their stats match up against every other Pokémon?
            </Typography>
            <Typography variant={"h6"}>
                Navigate to our search page to look up the stats to your favorite Pokémon!
            </Typography>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "min(950px, 50vw)",
                    padding: "4vh 0 4vh 0"
                }}
                alt={"Welcome to the World of Pokémon stat and attribute relation exploration!"}
                src={process.env.PUBLIC_URL + `/${props.isDarkMode ? "IndividualPageDarkMode" : "IndividualPageLightMode"}.png`}
            />
            <Typography variant={"h6"} sx={{pt: "4vh"}}>
                This page has:
            </Typography>
            <List sx={{ listStyleType: 'disc' }}>
                {
                    individualFeatures.map((val : string)=>
                        <ListItem sx={{display: 'list-item'}}>
                            <ListItemText
                                primaryTypographyProps={{style: {color: props.isDarkMode ? "white" : "black"}}}
                                primary={`${val}`}
                            />
                        </ListItem>
                    )
                }
            </List>
            <Typography variant={"h6"} sx={{pt: "4vh"}}>
                The interactive graph on this page can:
            </Typography>
            <List sx={{ listStyleType: 'disc' }}>
                {
                    individualGraphFeatures.map((val : string)=>
                        <ListItem sx={{display: 'list-item'}}>
                            <ListItemText
                                primaryTypographyProps={{style: {color: props.isDarkMode ? "white" : "black"}}}
                                primary={`${val}`}
                            />
                        </ListItem>
                    )
                }
            </List>
            <Typography variant={"h6"} sx={{p: "3vh 0 15vh 0"}}>
                You can get to this page using the navigation on the left or by clicking through
                the interactive graph on the individual Pokémon page!
            </Typography>

            {/* Start of Scale Section */}
            <Divider sx={{width: "100%"}}/>
            <Typography variant={"h4"} sx={{textAlign: "center", pt: "4vh"}}>
                Do you want to know how many Pikachus (or any other Pokémon) you need
                to get into the same weight class as a Wailord!?
            </Typography>
            <Typography variant={"h6"}>
                We got a scale for you!
            </Typography>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "min(950px, 50vw)",
                    padding: "4vh 0 4vh 0"
                }}
                alt={"Welcome to the World of Pokémon stat and attribute relation exploration!"}
                src={process.env.PUBLIC_URL + `/${props.isDarkMode ? "ScaleDarkMode" : "ScaleLightMode"}.png`}
            />
            <Typography variant={"h6"}>
                Try putting your favorite Pokémon against our lord and see how many it takes to take him down!
            </Typography>
            <Typography variant={"h6"} sx={{pb: "4vh"}}>
                Do you think you can find a heavier Pokémon? (hint: try using the graphing page)
            </Typography>


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
        </HomeContainer>
    )
}

export default Home