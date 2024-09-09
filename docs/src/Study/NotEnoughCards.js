import CreateIcon from "../Component/CreateIcon";
import {Link} from "react-router-dom"
import React from "react";

function NotEnoughCards({deckInfo}) {
    return (
        <>
            <h3>Not enough cards</h3>
            <p>You need at least 3 cards to study. There are {deckInfo.cards.length} cards in the deck.</p>
            <Link to={`/decks/${deckInfo.id}/cards/new`} className={"add-card btn"}><CreateIcon /> Add Card</Link>
        </>
    )
}

export default NotEnoughCards;