import { Routes, Route } from "react-router-dom";
import ListDecks from "../Deck/ListDecks";
import CreateDeck from "../Deck/CreateDeck";
import DeckView from "../Deck/DeckView";
import StudyView from "../Study/StudyView";
import NotFound from "./NotFound";
import CreateCard from "../Card/CreateCard";
import Navigation from "./Navigation";
import React from "react";
import EditDeck from "../Deck/EditDeck";

function RootRouter() {
    return (
        
            <Routes>
                <Route path={"/"} element={<Navigation />}>
                    <Route path="/" element={<ListDecks />} />
                    <Route path={"/decks/new"} element={<CreateDeck />} />
                    <Route path={"/decks/:deckId/*"} element={<DeckView />} />
                    <Route path={"/decks/:deckId/study"} element={<StudyView />} />
                    <Route path={"/decks/:deckId/edit"} element={<EditDeck />} />
                    <Route path={"/decks/:deckId/cards/new"} element={<CreateCard />} />
                    <Route path={"/decks/:deckId/cards/:cardId/edit"} element={<CreateCard />} />
                    <Route path={"*"} element={<NotFound />} />
                </Route>
            </Routes>
        
    )
}

export default RootRouter;