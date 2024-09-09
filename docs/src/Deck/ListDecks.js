import React, {useEffect, useState} from "react";
import {listDecks} from "../utils/api";
import DeckItem from "./DeckItem";
import {
    Outlet,
    Link
} from "react-router-dom";
import CreateIcon from "../Component/CreateIcon";
import NotFound from "../Layout/NotFound";

function ListDecks() {
    const [decks, setDecks] = useState([]);
    const abortController = new AbortController();

    useEffect(() => {
        console.log("Listing Decks...")
        listDecks(abortController.signal)
            .then(setDecks);
    }, [])

    const list =(decks.length > 0)?
        decks.map((deck) => (<DeckItem key={deck.id} deckItem={deck}/>)) : 
        (null);

    return (
        <>
            <Outlet />
            <Link to={"/decks/new"} className={"create btn"}><CreateIcon /> Create Deck</Link>
            {(decks.length > 0)?
                (
                     <section className={"deck-card-list"}>{list}</section>
                ):
                <NotFound />
            }
        </>
    )
}

export default ListDecks;
