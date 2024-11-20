import React, { useState, useEffect } from "react";

import PositionedComponent from "../../Library/PositionedComponent";
import WrapperComponent from "../../Library/WrapperComponent";
import ButtonComponent from "../../Library/ButtonComponent";
import TitleComponent from "../../Library/TitleComponent";
import SpacerComponent from "../../Library/SpacerComponent";

const StopwatchPage = () => {
  const [time, setTime] = useState(0); // Temps en secondes
  const [isRunning, setIsRunning] = useState(false); // Indique si le chronomètre est en cours
  const [intervalId, setIntervalId] = useState(null); // Stocke l'ID de l'intervalle pour pouvoir l'arrêter

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      setIntervalId(id);

      return () => clearInterval(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <PositionedComponent
      backgroundColor="transparent" 
      positionContent="top-center">
         <WrapperComponent
          maxWidth={1100}>
            <div>
              <TitleComponent
                text="Stop Watch"
                isCenter={true}
              />
              <hr />
              <TitleComponent
                text={formatTime(time)}  // Affiche l'heure formatée
                fontSize={80}
                isCenter={true}
              />
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px"
              }} >
                <ButtonComponent
                  text="Start"
                  clickEvent={start}
                  backgroundColor="var(--primary-color)"
                  borderColor="var(--primary-color)"
                  textColor="#fff"
                  active={isRunning}  // Active "Start" quand il est déjà en cours
                  width="300px"
                />
                <ButtonComponent
                  text="Stop"
                  clickEvent={stop}
                  backgroundColor="var(--primary-color)"
                  borderColor="var(--primary-color)"
                  textColor="#fff"
                  active={!isRunning}  // Active "Stop" lorsque le chronomètre est en marche
                  width="300px"
                />
                <ButtonComponent
                  text="Reset"
                  clickEvent={reset}
                  backgroundColor="var(--primary-color)"
                  borderColor="var(--primary-color)"
                  textColor="#fff"
                  active={false}
                  width="300px"
                />
              </div>
            </div>
          </WrapperComponent>
    </PositionedComponent> 
    
  );
};

export default StopwatchPage;
