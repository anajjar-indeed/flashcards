import {useLocation, useNavigate, Link} from "react-router-dom";
import StudyIcon from "../Component/StudyIcon"
import CreateIcon from "../Component/CreateIcon";
import ViewIcon from "../Component/ViewIcon";
import DeleteIcon from "../Component/DeleteIcon";
import "./DeckItem.css"
import {deleteDeck} from "../utils/api";
import EditIcon from "../Component/EditIcon";
import React from "react";

function DeckItem({deckItem}) {
    const location = useLocation();
    const navigate = useNavigate();

    if (!deckItem.id) {
        return (<></>);
    }

    const deleteHandle = () => {
        const deleteConfirm = window.confirm('Delete this deck? \n\nYou will not be able to recover it.');
        if (deleteConfirm) {
            const abortController = new AbortController();

            async function deleteDeckFun() {
                try {
                    await deleteDeck(deckItem.id, abortController.signal);
                    if(location.pathname === `/decks/${deckItem.id}`) {
                        setTimeout(() => (navigate("/")), 100)
                    } else {
                        window.location.reload();
                    }
                } catch (error) {
                    console.error('Error deleting deck:', error);
                }
            }

            deleteDeckFun();
        }
    };

    return (
        <article className="deck-item" key={deckItem.id}>
            <div className={`item-${deckItem.id}`}>
                <div className={"deck-top"}>
                    <h4 className={"deck-name"}>{deckItem.name}</h4>
                    <p className={"deck-card-count"}>{deckItem.cards.length} cards</p>
                </div>
                <div className={"deck-mid"}>
                    <p className={"deck-description"}>{deckItem.description}</p>
                </div>
                <div className={"deck-bottom"}>
                    {
                        (location.pathname === `/decks/${deckItem.id}`)?
                        <Link to={`/decks/${deckItem.id}/edit`} className={"edit btn"}><EditIcon /> Edit</Link>
                        :
                        <Link to={`/decks/${deckItem.id}`} className={"view btn"}><ViewIcon /> View</Link>
                    }
                    <Link to={`/decks/${deckItem.id}/study`} className={"study btn"}><StudyIcon/> Study</Link>
                    {
                        (location.pathname === `/decks/${deckItem.id}`)?
                            <Link to={`/decks/${deckItem.id}/cards/new`} className={"create btn"}><CreateIcon /> Add card</Link>:
                            null
                    }
                    <button className={"delete btn"} onClick={deleteHandle}><DeleteIcon /></button>
                </div>
            </div>
        </article>
    )
}

export default DeckItem;