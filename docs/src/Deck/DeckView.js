import React, { useEffect, useState } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import DeckItem from "./DeckItem";
import NotFound from "../Layout/NotFound";
import { readDeck } from "../utils/api";
import CardList from "../Card/CardList";

function DeckView() {
    const { deckId } = useParams();
    const [deckInfo, setDeckInfo] = useState({});

    useEffect(() => {
        const abortController = new AbortController();

        const fetchDeck = async () => {
            try {
                const res = await readDeck(deckId, abortController.signal);
                setDeckInfo(res);
            } catch (error) {
                console.error('Error fetching deck info:', error);
            }
        };

        if (deckId) {
            fetchDeck();
        } else {
            console.error('deckId is not defined');
        }

        return () => {
            abortController.abort();
        };
    }, [deckId]);

    if (Object.keys(deckInfo).length === 0) {
        return <NotFound name="Deck" />;
    }

    return (
        <section>
            <Routes>
                <Route path="/" element={
                    <>
                        <DeckItem key={deckId} deckItem={deckInfo} />
                        <CardList cards={deckInfo.cards} />
                    </>
                } />
                <Route path="*" element={<NotFound name="Deck" />} />
            </Routes>
        </section>
    );
}

export default DeckView;
