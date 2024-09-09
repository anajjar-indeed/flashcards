import "./CreateDeck.css"
import {createDeck} from "../utils/api";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function CreateDeck() {
    const initialDeck = {name: '' , description: ''};
    const [deck, setDeck] = useState(initialDeck);
    const navigate = useNavigate();

    const submitHandle = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        let response = {};
        createDeck(deck,abortController.signal)
            .then((res) => response = res)
        // setting 10ms so that the created deck is reflected in the deck
        setTimeout(() => (navigate(`/decks/${response.id}`)), 100);
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
            <h2>Create Deck</h2>
            <form id={"create-deck"} onSubmit={submitHandle}>
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
                    <button type="cancel" className={"cancel btn"} onClick={() => navigate("/")}>Cancel</button>
                    <button type="submit" className={"submit btn"}>Submit</button>
                </div>
            </form>
        </>
    )
}

export default CreateDeck;