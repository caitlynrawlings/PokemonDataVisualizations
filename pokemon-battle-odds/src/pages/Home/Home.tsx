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
            <Typography tabIndex={0} sx={{pb: "1vh", textAlign: "center"}} variant={"h1"} fontSize="50px">Stat and Attribute Exploration Application </Typography>
            <Divider sx={{width: "100%"}} aria-hidden="true"/>
            <Box
                tabIndex={0}
                component="img"
                sx={{
                    height: "auto",
                    width: "min(950px, 50vw)",
                    padding: "4vh 0 4vh 0"
                }}
                alt={"Cartoon of light skinned blonde man in purple shirt, brown trousers, and a lab coat with one hand in pocket and the other with his palm facing upwards. To his left is a picture of a balance scale with a pokeball on both sides of the scale. Above that is a colorful scatter plot. To his upper right is a image with the pokemon Bulbasaur with a histogram to the right of Bulbasaur and stat tables below Bulbasaur. Below the man in the lab coat is a text box that says 'Welcome to the world of Pokemon stat and attribute relation exploration!'"}
                src={process.env.PUBLIC_URL + "/HelloWorldPokemon.png"}
            />
            <Typography tabIndex={0} fontSize="24px">
                Welcome to the World of Pokémon stat and attributes!
            </Typography> 
            <Typography fontSize="24px" tabIndex={0} aria-level={0} sx={{padding: "0 0 15vh 0"}}>
                In this application, YOU get to choose how you want to use!
            </Typography>

            {/* Start of Graphing Section*/}
            <Divider sx={{width: "100%"}} aria-hidden="true" aria-level={0}/>
            <Typography fontSize="32px" tabIndex={0} role="text" sx={{textAlign: "center", pt: "2vh"}} aria-label="Are you looking for a Pokémon to join your team?">
                Are you looking for a Pokémon to join your team?
            </Typography>
            <Typography fontSize="20px" tabIndex={0} role="text">
                You need a Pokémon with good stats. Stats that YOU care about!
            </Typography>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "min(950px, 50vw)",
                    padding: "4vh 0 4vh 0"
                }}
                alt={"Scatter plot with many customization options above it. There is a generation selector slider with range from 1 to 7. Range of 1 to 7 selected. There is a toggle switch for colored by primary. The switch is toggled to true. There are two check boxes that say 'only legendary' and 'only non-legendary.' Neither is checked. There is a dropdown menu for what is on the y-axis which is set to speed. There is a dropdown menu for what is on the x-axis which is set to attack. There is a drop down menu for filtering primary trait and a drop down menu for filtering secondary trait. Neither is being used to filter. There is a legend for the color to primary encoding, listing bug, flying, normal, poison, dark, fighting, ground, psychic, rock, steel, water, dragon, ghost, grass, ice, electric, fairy, fire, and unknown. The scatter plot shows a loose positive correlation."}
                src={process.env.PUBLIC_URL + `/${props.isDarkMode ? "GraphingExampleDarkMode" : "GraphingExampleLightMode"}.png`}
            />
            <Typography fontSize="20px" tabIndex={0} role="text" sx={{pb: "3vh"}}>
                Use the graphing page to search for a Pokémon that fits your stat requirements!
            </Typography>
            <Typography fontSize="20px" tabIndex={0}>
                You can:
            </Typography>
            <List sx={{ listStyleType: 'disc' }}>
                {
                    graphingFeatures.map((val : string)=>
                        <ListItem sx={{display: 'list-item'}} aria-label={val} tabIndex={0}>
                            <ListItemText
                                primaryTypographyProps={{style: {color: props.isDarkMode ? "white" : "black"}}}
                                primary={val}
                                aria-hidden="true"
                            />
                        </ListItem>
                    )
                }
            </List>
            <Typography tabIndex={0} fontSize="20px" sx={{padding: "0 0 10vh 0"}} aria-label="Be it a search for a better Pokémon to add to your team or a desire to graph a relation,
                the user has the power to decide how to use the graph. Try looking into different relationships
                and reason out why they might look the way they do (try speed versus weight).">
                Be it a search for a better Pokémon to add to your team or a desire to graph a relation,
                the user has the power to decide how to use the graph. Try looking into different relationships
                and reason out why they might look the way they do (try speed vs weight).
            </Typography>

            {/* Start of Search Section */}
            <Divider sx={{width: "100%"}} aria-hidden="true"/>
            <Typography tabIndex={0} fontSize="32px" sx={{textAlign: "center", pt: "3vh"}}>
                Are you looking for searching for a specific Pokémon?
            </Typography>
            <Typography tabIndex={0} fontSize="20px">
                Navigate to our search page to look up the stats to your favorite Pokémon!
            </Typography>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "min(950px, 50vw)",
                    padding: "4vh 0 4vh 0"
                }}
                alt={"Search bar with p i k typed in. Search results displayed below in a table. Table headers are name, image, pokiedex number, height (meters), weight (kilograms), H P, attack, defensem special attack, special defense, speed, base total. The first result row is Pikachu, image of pikachu, 25, 0.4, 6, 35, 55, 40, 50, 50, 90, 320. The second result row is Pikipek, image of pikipek, 731, 0.3, 1.2, 35, 75, 30, 30, 30, 65, 265."}
                src={process.env.PUBLIC_URL + `/${props.isDarkMode ? "SearchDarkMode" : "SearchLightMode"}.png`}
            />
            <Typography tabIndex={0} fontSize="20px" sx={{p: "0 0 10vh 0"}}>
                You can get to this page using the navigation on the left or by clicking through
                the interactive graph on the individual Pokémon page!
            </Typography>

            {/* Start of Individual Page Section */}
            <Divider sx={{width: "100%"}} aria-hidden="true"/>
            <Typography tabIndex={0} fontSize="32px" sx={{textAlign: "center", pt: "4vh"}}>
                Do you want to know what the stats are for your favorite Pokémon?
                Do you also want to know how their stats match up against every other Pokémon?
            </Typography>
            <Typography tabIndex={0} fontSize="20px">
                Navigate to our search page to look up the stats to your favorite Pokémon!
            </Typography>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "min(950px, 50vw)",
                    padding: "4vh 0 4vh 0"
                }}
                alt={"In the top left there is a picture of Ludicolo. A green pokemon with yellow fur and a duck bill. Below Ludicolo are the words water and grass and then A table for his basic stats. The table headers are pokiedex number, height (meters), weight (kilograms) H P, attack, defense, special attack, special defense, speed, and base total. The table entries are 272, 1.5, 55, 80, 70, 70, 90, 100, 70, 480. Below that is a table of weakness modifiers. The columns are bug, dark, dragon, electr, fairy, fight, fire, flying, ghost, grass, ground, ice, normal, poison, psychc, rock, steel, water. The table entries are 2x, 1x, 1x, 1x, 1x, 1x, 1x, 2x, 1x, 1x, 0.5x, 1x, 1x, 2x, 1x, 1x, 0.5x, 0.25x. To the right of this is a histogram with a drop down menu to select stat. It is set to total. The title is where does Ludicolo fall in the total distribution for all pokemon? The x axis is total values and the y axis is count of pokemon. There are many blue bars and the tallest bar is green. The bars follow roughly a capital em shape."}
                src={process.env.PUBLIC_URL + `/${props.isDarkMode ? "IndividualPageDarkMode" : "IndividualPageLightMode"}.png`}
            />
            <Typography tabIndex={0} fontSize="20px" sx={{pt: "4vh"}}>
                This page has:
            </Typography>
            <List aria-label="" sx={{ listStyleType: 'disc' }}>
                {
                    individualFeatures.map((val : string)=>
                        <ListItem sx={{display: 'list-item'}} aria-label={val} tabIndex={0}>
                            <ListItemText
                                primaryTypographyProps={{style: {color: props.isDarkMode ? "white" : "black"}}}
                                primary={`${val}`}
                                aria-hidden="true"
                            />
                        </ListItem>
                    )
                }
            </List>
            <Typography tabIndex={0} fontSize="20px" sx={{pt: "4vh"}}>
                The interactive graph on this page can:
            </Typography>
            <List aria-hidden="true" sx={{ listStyleType: 'disc' }}>
                {
                    individualGraphFeatures.map((val : string)=>
                        <ListItem sx={{display: 'list-item'}} aria-label={val} tabIndex={0}>
                            <ListItemText
                                primaryTypographyProps={{style: {color: props.isDarkMode ? "white" : "black"}}}
                                primary={`${val}`}
                                aria-hdden="true"
                            />
                        </ListItem>
                    )
                }
            </List>
            <Typography tabIndex={0} fontSize="20px" sx={{p: "3vh 0 15vh 0"}}>
                You can get to this page using the navigation on the left or by clicking through
                the interactive graph on the individual Pokémon page!
            </Typography>

            {/* Start of Scale Section */}
            <Divider aria-hidden="true" sx={{width: "100%"}}/>
            <Typography tabIndex={0} fontSize="32px" sx={{textAlign: "center", pt: "4vh"}}>
                Do you want to know how many Pikachus (or any other Pokémon) you need
                to get into the same weight class as a Wailord!?
            </Typography>
            <Typography tabIndex={0} fontSize="20px">
                We got a scale for you!
            </Typography>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "min(950px, 50vw)",
                    padding: "4vh 0 4vh 0"
                }}
                alt={"A balance scale with the left side completely down. On the left side there is one pokieball. On the right side there are 3 pokieballs. Below the scale it says on the left: waillord, with a picture of waillord times a text entry box that has a one in it. There is also text that says on the right: pikachu, with a picture of pikachu times a text entry box that has a three in it. Waillord looks like a whale. Pikachu is a yellow creature standing on two legs with pointy ears and lightning bolt tail."}
                src={process.env.PUBLIC_URL + `/${props.isDarkMode ? "ScaleDarkMode" : "ScaleLightMode"}.png`}
            />
            <Typography tabIndex={0} fontSize="20px">
                Try putting your favorite Pokémon against our lord and see how many it takes to take him down!
            </Typography>
            <Typography tabIndex={0} fontSize="20px" sx={{pb: "4vh"}}>
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