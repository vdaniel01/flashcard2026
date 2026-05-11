import { useEffect, useState } from "react"
import CardDetails from "../components/CardDetails"
import CardForm from "../components/CardForm"
import { useCardContext } from "../hooks/useCardContext"
import {useAuthContext } from "../hooks/useAuthContext"


export default function Home(){
    const {cards, dispatch} = useCardContext()
    const {user} = useAuthContext()
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch("/api/cards", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type: "SET_CARD", payload: json})
            }
        }
        if(user){
            fetchCards()

        }
    }, [dispatch, user])

    return(
    <>
<div className="home">
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        Add New Card
      </button>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            <CardForm />
          </div>
        </div>
      )}

      <div className="cards">
        {cards && cards.map((card) => (
          <CardDetails key={card._id} card={card}/>
        ))}
      </div>
    </div>
    </>
    )
}