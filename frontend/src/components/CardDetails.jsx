import { useCardContext } from "../hooks/useCardContext"
import {useAuthContext } from "../hooks/useAuthContext"

export default function CardDetails({card}) {
    const {user} = useAuthContext()
    const {dispatch} = useCardContext()
    const handleClick = async () => {
        if(!user){
            return
        }
        const response = await fetch("/api/cards/"+card._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: "DELETE_CARD", payload: json})
        }
    }
    return(
        <>
        <div className="card-details">
            <h4>{card.question}</h4>
            <span onClick={handleClick}><i className="fa-solid fa-trash"></i></span>
            <hr />
            <h4>{card.answer}</h4>
            <p>{card.createdAt.split("T")[0]}</p>
        </div>
        </>
    )
}