import {useEffect, useState} from "react";
import {readString} from "react-papaparse";
import pokemonData from '../data/pokemon_info.csv'

// @ts-ignore
import * as d3 from 'd3';
import Papa from "papaparse";

export const useFetchPokemonInfo = () => {

    const[data, setData] = useState<any>([]);
    const[traits, setTraits] = useState<string[]>([]);

    const parseRows = (d : any) => {
        d.against_bug = +d.against_bug;
        d.against_dark = +d.against_dark;
        d.against_dragon = +d.against_dragon;
        d.against_electric = +d.against_electric;
        d.against_fairy = +d.against_fairy;
        d.against_fight = +d.against_fight;
        d.against_fire = +d.against_fire;
        d.against_flying = +d.against_flying;
        d.against_ghost = +d.against_ghost;
        d.against_grass = +d.against_grass;
        d.against_ground = +d.against_ground;
        d.against_ice = +d.against_ice;
        d.against_normal = +d.against_normal;
        d.against_poison = +d.against_poison;
        d.against_psychic = +d.against_psychic;
        d.against_rock = +d.against_rock;
        d.against_steel = +d.against_steel;
        d.against_water = +d.against_water;
        d.attack = +d.attack;
        d.base_egg_steps = +d.base_egg_steps;
        d.base_happiness = +d.base_happiness
        d.base_total = +d.base_total;
        d.capture_rate = +d.capture_rate;
        d.defense = +d.defense;
        d.experience_growth = +d.experience_growth;
        d.generation = +d.generation;
        d.height_m = +d.height_m;
        d.hp = +d.hp;
        d.is_legendary = +d.is_legendary;
        d.percentage_male = +d.percentage_male;
        d.pokedex_number = +d.pokedex_number;
        d.sp_attack = +d.sp_attack;
        d.sp_defense = +d.sp_defense;
        d.speed = +d.speed;
        d.weight_kg = +d.weight_kg;
        return d;
    }

    const papaConfig : any = {
        complete: async (results : any, file : any) => {
            setData(await d3.csv(file, parseRows));
        },
        download: true,
        error: (error : any, file : any) => {
            console.log('Error while parsing:', error, file);
        },
    };

    useEffect(()=>{
        readString(pokemonData, papaConfig);
    },[]);

    useEffect(()=>{
        const types : string[] = [];
        data.map((datum : any) => {
            if(!types.includes(datum.type1)) {
                types.push(datum.type1);
            }
            return null;
        }, [])
        setTraits(types);
    }, [data]);


    // const temp = readString(pokemonData, papaConfig)

    return {data, traits}
}