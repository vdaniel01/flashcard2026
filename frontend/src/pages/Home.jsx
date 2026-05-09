import { useEffect, useState } from "react"
import CardDetails from "../components/CardDetails"
import CardForm from "../components/CardForm"
import { useCardContext } from "../hooks/useCardContext"
export default function Home(){
    const {cards, dispatch} = useCardContext()
    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch("/api/cards")
            const json = await response.json()
            if(response.ok){
                dispatch({type: "SET_CARD", payload: json})
            }
        }

        fetchCards()
    }, [])

    return(
    <>
    <CardForm/>
    <div className="home">
        <div className="cards">
            {cards && cards.map((card) => (
                <CardDetails key={card._id} card={card}/>
            ))}
        </div>
    </div>
    </>
    )
}