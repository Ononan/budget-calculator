import React from 'react'
import Element from './Element'

export default function ListElement({arrValues,deleteElement}){
    return(
        <div className="list-value">
            <ul>
                {
                    arrValues.map(element => {
                        return <Element element={element} key={element.id} deleteElement={deleteElement}/>
                    })
                }
            </ul>
        </div>
    )
}