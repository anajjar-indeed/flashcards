import React, {useState} from "react";
import "./StudyCard.css"
import {useNavigate} from "react-router-dom";

function StudyCard({cards}) {
    const navigate = useNavigate();
    const [flip, setFlip] = useState(false);
    const [flipCount, setFlipCount] = useState(0);
    const [currentCard, setCurrentCard] = useState(1);

    const nextClickHandler = () => {
        if (currentCard >= cards.length) {
            const reset = window.confirm("Reset cards? \n\n Click cancel to return to home page")
            const currentCount = (reset) ? 1 : navigate("/");
            setFlip(false);
            setCurrentCard(currentCount);
            setFlipCount(0);
        } else {
            setFlip(false);
            setCurrentCard((currentCount) => currentCount+1);
            setFlipCount(0);
        }
    };

    const flipHandler = () => {
        setFlip((currentFlip) => !currentFlip);
        setFlipCount((currentCount) => currentCount + 1);
    }

    return (cards && cards.length > 0)?
        (<>
                <div className={"study-card"}>
                    <h3>Card {currentCard} of {cards.length}</h3>
                    <p>{(flip)? cards[currentCard-1].back: cards[currentCard-1].front}</p>
                    <button onClick={flipHandler} className={"flip btn"}>Flip</button>
                    {
                        (flipCount > 0)?
                            <button onClick={nextClickHandler} className={"next btn"}>Next</button>
                            : null
                    }
                </div>
            </>
        ):
        null
}

export default StudyCard;
