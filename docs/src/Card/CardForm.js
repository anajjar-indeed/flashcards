import React from "react";

function CardForm({ create }) {
 

    return (
        <form className="create-card">
            <h2>Edit Card</h2>
            <label htmlFor="card-front">
                Front:
                <textarea
                    id="card-front"
                    name="front"
                    placeholder="Front side of the card"
                    onChange={changeHandle}
                    required
                />
            </label>
            <br />
            <label htmlFor="card-back">
                Back:
                <textarea
                    id="card-back"
                    name="back"
                    placeholder="Back side of the card"
                    onChange={changeHandle}
                    required
                />
            </label>
            <div>
                <button type="button" className="cancel btn" onClick={cancelHandle}>Cancel</button>
                <button type="submit" className="submit btn" onClick={submitHandle}>Submit</button>
            </div>
        </form>
    );
}

export default CardForm;
