import React, {useEffect, useState} from 'react';
import { Link, useLocation, useParams, Outlet } from 'react-router-dom';
import {readDeck} from "../utils/api";


function Navigation() {
    const location = useLocation();
    const abortController = new AbortController();
    let cardsIndex = Infinity;
    const { deckId, cardId } = useParams();
    const [deckName, setDeckName] = useState(null);

    useEffect(() => {
        if(deckId) {
            readDeck(deckId, abortController.signal)
                .then((res) => setDeckName(res.name))
                .catch(console.error);
        }
    })

    const breadcrumbs = () => {
        const pathname = location.pathname;
        const pathnames = pathname.split('/').filter((x) => x);

        return (
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    {pathnames.map((value, index) => {
                        if(value === 'cards') {
                            cardsIndex = index;
                        }

                        if(value !== 'decks' && value !== 'cards') {
                            if (value === 'study' || value ==='new' || index !== cardsIndex + 1) {
                                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                                if (value === deckId) {
                                    value = deckName;
                                    cardsIndex = index;
                                } else if (value === 'new' && index !== cardsIndex + 1) {
                                    value = 'Create Deck';
                                } else if (value === 'edit' && index === cardsIndex + 1) {
                                    value = 'Edit Deck';
                                } else if (value === 'edit' && index > cardsIndex + 1) {
                                    value = 'Edit Card';
                                } else if (value === 'new' && index === cardsIndex + 1) {
                                    value = 'Add Card';
                                }
                                return (
                                    <li key={to} className="breadcrumb-item">
                                        <Link to={to}>{value}</Link>
                                    </li>
                                );
                            }
                        }
                    })}
                </ol>
            </nav>
        );
    };

    return (
        <>
            <section className="breadcrumbs">
                {breadcrumbs()}
            </section>
            <Outlet />
        </>
    );
}

export default Navigation;