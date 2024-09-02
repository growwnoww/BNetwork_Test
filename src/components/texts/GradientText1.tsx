import React from 'react'

interface GradientText1Types{ 

    text:string;
    desktopSize:string;
    mobileSize:string;
}
const GradientText1 = ({text,desktopSize,mobileSize}:GradientText1Types) => {
  return (
    <>
         <h1 className={`pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/90 bg-clip-text text-center text-${mobileSize} lg:text-${desktopSize} font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/80`}>
            {text}
        </h1>
    </>
  )
}

export default GradientText1