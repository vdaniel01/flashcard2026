import { createContext, useReducer } from "react";
import { cardsReducer } from "../reducer/cardsReducer";
export const CardContext = createContext()

export const CardContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(cardsReducer, {
        cards: null
    })


    return(
        <CardContext.Provider value={{...state, dispatch}}>
            {children}
        </CardContext.Provider>
    )
}