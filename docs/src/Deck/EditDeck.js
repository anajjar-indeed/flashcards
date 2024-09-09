import {readDeck, updateDeck} from "../utils/api";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function EditDeck() {
    const {deckId} = useParams();
    const [deck, setDeck] = useState({});
    const navigate = useNavigate();
    const abortController = new AbortController();

    useEffect(() => {
        readDeck(deckId, abortController.signal)
            .then((res) => {
                setDeck(res)
                document.getElementById('deck-name').value = res.name;
                document.getElementById('deck-description').value = res.description;
            })
            .catch(console.error)
    }, [])

    const updateHandle = (event) => {
        event.preventDefault();
        updateDeck(deck,abortController.signal)
            .then((res) => console.log(res))
        setTimeout(() => (navigate(`/decks/${deckId}`)), 100);
    }

    const changeHandle = (event) => {
        const {name, value} = event.target;
        setDeck((initialDeck) => ({
                ...initialDeck,
                [name]: value
            }),
        )
    }

    return (
        <>
            <h2>Edit Deck</h2>
            <form id={"create-deck"} onSubmit={updateHandle}>
                <label htmlFor="deck-name">
                    Name: <br/>
                    <input type="text" id="deck-name" name="name" placeholder="Deck Name" onChange={changeHandle} required/>
                </label>
                <br/>
                <label htmlFor="deck-description">
                    Description: <br/>
                    <textarea id="deck-description" name="description" placeholder="Brief description of the deck" onChange={changeHandle} required/>
                </label>
                <br/>
                <div>
                    <button type="cancel" className={"cancel btn"} onClick={() => navigate(`/decks/${deckId}`)}>Cancel</button>
                    <button type="submit" className={"submit btn"}>Submit</button>
                </div>
            </form>
        </>
    )
}

export default EditDeck;
