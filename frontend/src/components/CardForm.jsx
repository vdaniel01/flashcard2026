import { useState } from "react"
import { useCardContext } from "../hooks/useCardContext"
export default function CardForm() {
    const {dispatch} = useCardContext()
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [error, setError] = useState("")
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const card = {question, answer}
        const response = await fetch("/api/cards", {
            method: "POST",
            body: JSON.stringify(card),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setQuestion("")
            setAnswer("")
            setError(null)
            console.log("new card added")
            dispatch({type: "CREATE_CARD", payload: json})
        }
    }

    return(
        <>
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new card</h3>

            <label>Card question:</label>
            <input type="text" name="" id="" 
            onChange={(e) => {setQuestion(e.target.value)}}
            value={question} 
            className={emptyFields.includes("question")? "error": ""}/>


            <label>Card answer:</label>
            <input type="text" name="" id="" 
            onChange={(e) => {setAnswer(e.target.value)}}
            value={answer} 
            className={emptyFields.includes("answer")? "error": ""}
            />
            <button>Add card</button>
            {error && <div className="error">{error}</div>}
        </form>
        </>
    )
}