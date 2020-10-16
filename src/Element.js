import React from 'react'

export default function Element({element,deleteElement}){
    
    return(
        <li>
            <span>{element.value}</span>
            <button onClick={() => deleteElement(element)} className="button_delete">x</button>
        </li>
    )
}