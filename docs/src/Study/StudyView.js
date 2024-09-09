import StudyCard from "./StudyCard";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {readDeck} from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";

function StudyView() {
    const { deckId } = useParams();
    const [deckInfo, setDeckInfo] = useState({});

    useEffect(() => {
        const abortController = new AbortController();

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

        return () => {
            abortController.abort();
        };
    }, [deckId]);

    if(!deckInfo.cards) {
        return null;
    }

    return (
        <>
            <section>
                <h2>Study: {deckInfo.name}</h2>
                {(deckInfo.cards.length < 3) ?
                    <NotEnoughCards deckInfo={deckInfo}/> :
                    <StudyCard cards={deckInfo.cards}/>
                }
            </section>
        </>
    )
}

export default StudyView;
