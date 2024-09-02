import React from 'react'
import CosmosLevel from './(cosmosnetwork)/CosmosLevel'
import CosMosPackage from './(cosmosnetwork)/CosMosPackage'

type Props = {
    planname:number
}

const Plans = (props: Props) => {
    
    const renderPlan = ():React.ReactNode =>{
        if(props.planname == 1){
            return <CosMosPackage/>
        }

        return <CosmosLevel/>
    }
  return (
    <div>
        {renderPlan()}
    </div>
  )
}

export default Plans