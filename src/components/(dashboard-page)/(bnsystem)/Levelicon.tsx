"use client"

import React, { useContext, useEffect, useState } from 'react';


interface levelType {
  level: number;
  id:string;
  context?:string;
  planetCount?:number;
}


const LevelIcon:React.FC<levelType>= ({ level,id ,context,planetCount}) => {
 let planetBoughtLen = planetCount || 0;
  const svgStyles = {
    fill: context === 'planetUpgrade' ? 'black' : 'black',
    stroke: 'black',
  };
  const highlightStyles = {
    fill:context === 'planetUpgrade' ?'#e7b603' : '#444249',
    fillOpacity: '1',
  };
  const defaultStyles = {
    fill: 'white',
   
    fillOpacity: level <= planetBoughtLen? '1' : '0.2',
  };

 




  return (
    <div id={id} className="relative w-fit  flex items-center justify-center">
      <svg width="56 " height="56 " viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="28" style={svgStyles}></rect>
                 <path
                    d="M28 2C32.564 2 37.0475 3.20136 41 5.48334C44.9525 7.76531 48.2347 11.0475 50.5167 15L47.1392 16.95C45.1995 13.5904 42.4096 10.8005 39.05 8.86084C35.6904 6.92116 31.8794 5.9 28 5.9V2Z"
                    style={level <= planetBoughtLen ? highlightStyles : defaultStyles} stroke='black'></path>
                  <path
                    d="M50.5167 15C52.7986 18.9525 54 23.436 54 28C54 32.5639 52.7986 37.0475 50.5167 41L47.1392 39.05C49.0788 35.6904 50.1 31.8794 50.1 28C50.1 24.1206 49.0788 20.3096 47.1392 16.95L50.5167 15Z"
                    style={level <= planetBoughtLen ? highlightStyles : defaultStyles}stroke='black' ></path>
                  <path
                    d="M50.5167 41C48.2347 44.9525 44.9525 48.2347 41 50.5167C37.0475 52.7986 32.564 54 28 54L28 50.1C31.8794 50.1 35.6904 49.0788 39.05 47.1392C42.4096 45.1995 45.1995 42.4096 47.1392 39.05L50.5167 41Z"
                    style={level <= planetBoughtLen ? highlightStyles : defaultStyles}stroke='black'></path>
                  <path
                    d="M28 54C23.436 54 18.9525 52.7986 15 50.5167C11.0475 48.2347 7.76532 44.9525 5.48334 41L8.86084 39.05C10.8005 42.4096 13.5904 45.1995 16.95 47.1392C20.3096 49.0788 24.1206 50.1 28 50.1V54Z"
                    style={level <= planetBoughtLen ? highlightStyles : defaultStyles} stroke='black'></path>
                  <path
                    d="M5.48334 41C3.20136 37.0475 2 32.564 2 28C2 23.4361 3.20136 18.9525 5.48334 15L8.86084 16.95C6.92116 20.3096 5.9 24.1206 5.9 28C5.9 31.8794 6.92116 35.6904 8.86084 39.05L5.48334 41Z"
                    style={level <= planetBoughtLen ? highlightStyles : defaultStyles} stroke='black'></path>
                  <path
                    d="M5.48334 15C7.76532 11.0475 11.0475 7.76532 15 5.48334C18.9525 3.20136 23.436 2 28 2V5.9C24.1206 5.9 20.3096 6.92116 16.95 8.86084C13.5904 10.8005 10.8005 13.5904 8.86084 16.95L5.48334 15Z"
                    style={level <= planetBoughtLen ? highlightStyles : defaultStyles} stroke='black'></path>
      </svg>
      <p className="absolute ">{level}</p>

      
    </div>


  );
};

export default LevelIcon;
