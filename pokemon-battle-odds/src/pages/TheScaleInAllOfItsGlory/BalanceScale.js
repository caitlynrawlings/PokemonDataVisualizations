import React, { useState, useEffect } from 'react';
import './BalanceScale.css'; // Import the CSS file for styling
import pokeball from '../../media/pokeball.png'
import {useTheme} from "@mui/material/styles";

const BalanceScale = ({ leftWeight, rightWeight, leftHeight, rightHeight, leftNum, rightNum, leftImage, rightImage, style }) => {
  const theme = useTheme();
  const [tiltAngle, setTiltAngle] = useState(0);
  const [rightWeightLength, setRightWeightLength] = useState(0);
  const [leftWeightLength, setLeftWeightLength] = useState(0);
  const [rightWeightLength1, setRightWeightLength1] = useState(0); // outside diagonal lines
  const [leftWeightLength1, setLeftWeightLength1] = useState(0);  // outside diagonal lines

  const [transitionTiltAngle, setTransitionTiltAngle] = useState(0);  // used for animation

  useEffect(() => {
    const targetTiltAngle = parseFloat(rightWeight) >= parseFloat(leftWeight)
      ? Math.min((Math.PI / 180) * (rightWeight - leftWeight), 0.8726646259971648)
      : Math.max(-0.8726646259971648, (Math.PI / 180) * (rightWeight - leftWeight));

    const timeUnit = 2 / Math.abs(Math.min(targetTiltAngle - transitionTiltAngle, 100));

    const updateTransitionTiltAngle = () => {
      if (transitionTiltAngle < targetTiltAngle) {
        setTransitionTiltAngle((prevAngle) =>
          Math.min(prevAngle + 0.01, targetTiltAngle)
        );
      } else if (transitionTiltAngle > targetTiltAngle) {
        setTransitionTiltAngle((prevAngle) =>
          Math.max(prevAngle - 0.01, targetTiltAngle)
        );
      }
    };

    const intervalId = setInterval(updateTransitionTiltAngle, timeUnit);

    return () => {
      clearInterval(intervalId);
      setTiltAngle(transitionTiltAngle);
      lengthOfLines(transitionTiltAngle)
    };
  }, [leftWeight, rightWeight, transitionTiltAngle]);

  // sets the length of the diaganol lines connecting the wiehgt to the tilty line
  // so they look connected but not like they are going through the line at different
  // paths along the circumfrance
  const lengthOfLines = (angle) => {
    if (angle > 0.5) {  // right weighs a lot more
      setLeftWeightLength(-8)
      setRightWeightLength(3)
      setLeftWeightLength1(-4)
      setRightWeightLength1(3)
    } else if (angle < -0.5) {  // left weighs a lot more
      setLeftWeightLength(3)
      setRightWeightLength(-8)
      setLeftWeightLength1(3)
      setRightWeightLength1(-4)
    } else if (angle > 0.2) {  // right weighs more
      setLeftWeightLength(-5)
      setRightWeightLength(3)
      setLeftWeightLength1(-4)
      setRightWeightLength1(3)
    } else if (angle < -0.2) {  // left weighs more
      setLeftWeightLength(3)
      setRightWeightLength(-5)
      setLeftWeightLength1(3)
      setRightWeightLength1(-4)
    } else {
      setLeftWeightLength(0)
      setRightWeightLength(0)
      setLeftWeightLength1(0)
      setRightWeightLength1(0)
    }
  }

  useEffect(() => {
    const angle = rightWeight >= leftWeight
      ? Math.min((Math.PI / 180) * (rightWeight - leftWeight), 0.8726646259971648)
      : Math.max(-0.8726646259971648, (Math.PI / 180) * (rightWeight - leftWeight));
  
    setTiltAngle(angle || 0);
  }, [leftWeight, rightWeight]);


  const x0 = 150;  // x pos of the center of rotation of the tilting line
  const y0 = 172;  // y pos of the center of rotation of the tilting line
  const radius = 125;  // half length of "tilting line"
  const pokeballHeight = 25; // Adjust the height of one Pokeball

  const generatePokeballs = (num, side) => {
    return Array.from({ length: num }).map((_, index) => {
      const calculatedBottom = index * (pokeballHeight - 15);
  
      return (
        <div
          key={`${side}Pokeball-${index}`}
          className='pokeball'
          style={{ bottom: `${calculatedBottom}px` }}
        >
          {side === 'left' ? (leftImage !== null && <img src={pokeball} alt={"pokeball"} style={{ height: `${pokeballHeight}px` }} />) : <div></div>}
          {side === 'right' ? (rightImage !== null && <img src={pokeball} alt={"pokeball"} style={{ height: `${pokeballHeight}px` }} />) : <div></div>}
        </div>
      );
    });
  };

  const scaleColor = theme.palette.primary.main;
  

  return (
    <div style={style}>
      <div className="balance-scale-container">
        <div className="balance-scale">
          <div
            className="tilting-line"
            style={{ transform: `rotate(${transitionTiltAngle}rad)`,
            backgroundColor: theme.palette.text.primary,
            /* transition: 'transform 0.3s, left 0.3s, bottom 0.3s' */}}
          ></div>
          <div className="right-thing">
            <div
              className='diagonal-line'
              style={{
                transform: `rotate(${19}deg)`,
                bottom: `${((y0 + radius * -1 * Math.sin(transitionTiltAngle)) - 58)}px`,
                left:  `${(x0 + radius * Math.cos(transitionTiltAngle)) - 17}px`,
                height: `calc(61px + ${rightWeightLength}px)`,
                backgroundColor: theme.palette.text.primary,
                /* transition: 'transform 0.3s, left 0.3s, bottom 0.3s' */
              }}
            ></div>
            <div 
              className='diagonal-line' 
              style={{ 
                transform: `rotate(${-20}deg)`,
                bottom: `${((y0 + radius * -1 * Math.sin(transitionTiltAngle)) - 58)}px`,
                left:  `${(x0 + radius * Math.cos(transitionTiltAngle)) + 7}px`,
                height: `calc(61px + ${rightWeightLength1}px)`,
                backgroundColor: theme.palette.text.primary,
                /* transition: 'transform 0.3s, left 0.3s, bottom 0.3s' */
                
              }}
            ></div>
            <div 
              className='pokeball-container'
              style={{
                bottom: `${((y0 + radius * -1 * Math.sin(transitionTiltAngle)) - 60)}px`,
                left: `${(x0 + radius * Math.cos(transitionTiltAngle)) - 16}px`,
                /* transition: 'transform 0.3s, left 0.3s, bottom 0.3s' */
              }}
              >{generatePokeballs(rightNum, 'right')}
            </div>
            <div 
              className="semicircle"
              style={{
                bottom: `${((y0 + radius * -1 * Math.sin(transitionTiltAngle)) - 53 - 25)}px`,
                left:  `${(x0 + radius * Math.cos(transitionTiltAngle)) - 29}px`,
                backgroundColor: theme.palette.text.primary,
                /* transition: 'transform 0.3s, left 0.3s, bottom 0.3s' */
              }}
            ></div>
          </div>
          <div className="left-thing">
            <div
              className='diagonal-line'
              style={{
                transform: `rotate(${19}deg)`,
                bottom: `${((y0 + radius * Math.sin(transitionTiltAngle)) - 58)}px`,
                left:  `${(x0 + radius * -1 * Math.cos(transitionTiltAngle)) - 9}px`,
                height: `calc(61px + ${leftWeightLength1}px)`,
                backgroundColor: theme.palette.text.primary,
                /* transition: 'transform 0.3s, left 0.3s, bottom 0.3s' */
              }}
            ></div>
            <div 
              className='diagonal-line' 
              style={{ 
                transform: `rotate(${-20}deg)`,
                bottom: `${((y0 + radius * Math.sin(transitionTiltAngle)) - 58)}px`,
                left:  `${(x0 + radius * -1 * Math.cos(transitionTiltAngle)) + 16}px`,
                height: `calc(61px + ${leftWeightLength}px)`,
                backgroundColor: theme.palette.text.primary,
                /* transition: 'transform 0.3s, left 0.3s, bottom 0.3s' */
              }}
            ></div>
            <div 
              className='pokeball-container'
              style={{
                bottom: `${((y0 + radius * Math.sin(transitionTiltAngle)) - 60)}px`,
                left:  `${(x0 + radius * -1 * Math.cos(transitionTiltAngle)) - 9}px`,
                /* transition: 'transform 0.3s, left 0.3s, bottom 0.3s' */
              }}
              >{generatePokeballs(leftNum, 'left')}
            </div>
            <div 
              className="semicircle"
              style={{
                bottom: `${((y0 + radius * Math.sin(transitionTiltAngle)) - 53 - 25)}px`,
                left:  `${(x0 + radius * -1 * Math.cos(transitionTiltAngle)) - 20}px`,
                backgroundColor: theme.palette.text.primary,
                /* transition: 'transform 0.3s, left 0.3s, bottom 0.3s' */
              }}
            ></div>
          </div>
          <div className="base">
            <div className='tall-thin-rect' style={{ backgroundColor: theme.palette.text.primary, }} ></div>
            <div className='tall-thick-rect' style={{ backgroundColor: theme.palette.text.primary, }}></div>
            <div className="short-rectangle" style={{ backgroundColor: theme.palette.text.primary, }}></div>
            <div className="long-rectangle" style={{ backgroundColor: theme.palette.text.primary, }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceScale;
