import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../Component/DeleteIcon";
import EditIcon from "../Component/EditIcon";
import { deleteCard } from "../utils/api";
import "./CardItem.css";

function CardItem({ card }) {
    const handleDelete = async (event) => {
        const confirmDelete = window.confirm('Delete the card?\n\nYou will not be able to recover it.');
        if (confirmDelete) {
            try {
                const abortController = new AbortController();
                await deleteCard(card.id, abortController.signal);
                window.location.reload();
            } catch (error) {
                console.error('Error deleting card:', error);
            }
        }
    };

    return (
        <article className="card-item" key={card.id}>
            <div className={`item-${card.id}`} id="card-content">
                <div className="card-front">
                    <p className="card-name">{card.front}</p>
                </div>
                <div className="card-back">
                    <p className="card-name">{card.back}</p>
                </div>
            </div>
            <div className="deck-action">
                <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`} className="edit btn">
                    <EditIcon /> Edit
                </Link>
                <button className="delete btn" onClick={handleDelete}>
                    <DeleteIcon />
                </button>
            </div>
        </article>
    );
}

export default CardItem;
