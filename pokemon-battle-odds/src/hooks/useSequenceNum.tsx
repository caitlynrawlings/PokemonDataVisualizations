import {useState} from "react";

export const useSequenceNum = () => {
    const [state, setState] = useState<number>(0);

    const getNewNum = () => {
        const oldNum = state;
        setState(state + 1);
        return oldNum;
    }

    const getNewNumArray = (numsWanted : number) => {
        let tempArray = [];
        for (let i = state; i < state + numsWanted; i++) {
            tempArray.push(i);
        }
        setState(state + numsWanted);
        return tempArray;
    }

    return {getNewNum, getNewNumArray};
}