import React, {useEffect, useState} from 'react';
import "./HomePage.css";
import data from "/src/json/photographers.json";
import {Link, useNavigate} from "react-router-dom";

export default function Homepage() {
    const [photographersInformation, setPhotographersInformation] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        let photographers = []
        for (let i = 0; i < data.photographers.length; i++) {
            photographers.push(data.photographers[i])
        }
        setPhotographersInformation(photographers)
        setLoading(false)
    }, [])

    return (
        <>
            <header>
                <img src={"logo.png"} alt="logo" className="logo"/>
                <h1 className={"photographer-list"}>Nos photographes</h1>
            </header>
            <main className={"photographer-section"}>
                {photographersInformation.map((photographer) => {
                    return (
                        <div key={photographer.id} className={"photographe-container"}>
                            <Link to={`/photographerPage${photographer.id}`} >
                                <img className={"photographer-image"}
                                     src={`/PhotographersIdPhotos/${photographer.portrait}`} alt="photographe picture"/>
                                <h2 className={"photographer-name"}>{photographer.name}</h2>
                            </Link>
                            <p className={"photographer-city"}>{photographer.city}, {photographer.country}</p>
                            <p className={"photographer-description"}>{photographer.tagline}</p>
                            <p className={"photographer-price"}>{photographer.price}€/jour</p>
                        </div>
                    )
                })}
            </main>
        </>
    )
}

