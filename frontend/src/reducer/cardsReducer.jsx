export const cardsReducer = (state, action) => {
    switch(action.type){
        case "SET_CARD":
            return {
                cards: action.payload
            }
        case "CREATE_CARD":
            return {
                cards: [action.payload, ...state.cards]
            }
        case "DELETE_CARD":
            return {
                cards: state.cards.filter((c)=>c._id !== action.payload._id)
            }
        default:
            return state
    }
}