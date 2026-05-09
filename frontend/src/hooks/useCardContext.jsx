import { CardContext } from "../context/CardContext";
import { useContext } from "react";

export const useCardContext = () => {
    const context = useContext(CardContext)

    if(!context){
        throw Error("useCardContext must be use inside a CardContextProvider")
    }

    return context;

}