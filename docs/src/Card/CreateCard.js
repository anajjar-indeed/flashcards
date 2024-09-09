import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {createCard, readCard, readDeck, updateCard} from "../utils/api";
import "./CreateCard.css"
import React from "react";

function CreateCard() {
    const location = useLocation();
    const navigate = useNavigate();
    const {deckId, cardId} = useParams();
    
    const initialCardData = {front: '', back: ''}
    
    const [deckInfo, setDeckInfo] = useState({});
    const [card, setCard] = useState(initialCardData);
    const abortController = new AbortController();

    useEffect(() => {
        const abortController = new AbortController();
        if (location.pathname.includes('new')) {
            async function fetchDeck() {
                try {
                    const res = await readDeck(deckId, abortController.signal);
                    setDeckInfo(res);
                } catch (error) {
                    console.error('Error fetching deck info:', error);
                }
            }

            if (deckId) {
                fetchDeck();
            } else {
                console.error('deckId is not defined');
            }
        } else {
            readCard(cardId, abortController.signal)
                .then((res) => {
                    setCard(res);
                    document.getElementById('card-front').value = res.front;
                    document.getElementById('card-back').value = res.back;
                })
                .catch(() => navigate("/"));
        }
        return () => {
            abortController.abort();
        };
    }, [deckId]);

    const saveHandle = (event) => {
        if (card.back !== '' && card.front !== '') {
            if (location.pathname.includes('new')) {
                createCard(deckId, card, abortController.signal)
                    .then((res) => {
                        console.log(res);
                        setCard({ ...initialCardData });
                    })
                    .catch((error) => console.error(error));
            } else {
                event.preventDefault();
                updateCard(card, abortController.signal)
                    .then((res) => console.log(res))
                setTimeout(() => navigate(`/decks/${deckId}`), 10);
            }
        }
    };

    const doneHandle = (event) => {
        navigate(`/decks/${deckId}`);
    }

    const changeHandle = (event) => {
        const {name, value} = event.target;
        setCard((currentData) => ({
            ...currentData,
            [name]: value
        }))
    }



    return (
        <form className={"create-card"}>
            <h2>{location.pathname.includes('new')? (`${deckInfo.name}: Add Card`): `Edit Card`}</h2>
            <label htmlFor={"card-front"}>
                Front:
                <textarea
                    id={"card-front"}
                    name={"front"}
                    placeholder={"Front side of the card"}
                    onChange={changeHandle}
                    required
                />
            </label>
            <br/>
            <label>
                Back:
                <textarea
                    id={"card-back"}
                    name={"back"}
                    placeholder={"Back side of the card"}
                    onChange={changeHandle}
                    required
                />
            </label>
            <div>
                <button type="cancel" className={"cancel btn"} onClick={doneHandle}>
                    {location.pathname.includes('new')? "Done" : "Cancel"}
                </button>
                <button type="submit" className={"submit btn"} onClick={saveHandle}>
                    {location.pathname.includes('new')? "Save" : "Submit"}
                </button>
            </div>
        </form>
    )
}

export default CreateCard;
