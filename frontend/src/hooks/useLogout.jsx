import { useAuthContext } from "./useAuthContext"
import { useCardContext } from "./useCardContext"
export const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: cardsDispatch} = useCardContext()
    const logout = () => {
        localStorage.removeItem("user")
        dispatch({type: "LOGOUT"})
        cardsDispatch({type: "SET_CARD", payload: null})
    }


    return {logout}

}