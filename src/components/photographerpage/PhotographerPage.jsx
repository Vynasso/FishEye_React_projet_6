import React, {useEffect, useState} from 'react';
import "./PhotographerPage.css";
import data from "/src/json/photographers.json";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import ContactModal from "../contactModal/ContactModal.jsx";

export default function PhotographerPage() {
    const [photographersImage, setPhotographersImage] = useState([])
    const [photographerInformation, setPhotographerInformation] = useState([])
    const [imgNumberOfLikes, setImgNumberOfLikes] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const params = useParams()


    useEffect(() => {
        let userId = +params.user_id
        let photographer = data.photographers.filter(photographe => photographe.id === userId)
        setPhotographerInformation(photographer[0])
        let uniqueImage = data.media.filter(image => image.photographerId === userId)
        let numberOfLikes = 0
        for (let i = 0; i < uniqueImage.length; i++){
            numberOfLikes += uniqueImage[i].likes
        }
        setImgNumberOfLikes(numberOfLikes)
        setPhotographersImage(uniqueImage)
    },[])


    return (
        <div>
            {modalOpen && <ContactModal photographerName={photographerInformation.name} setOpenModal={setModalOpen} />}
            <header>
                <a href="/">
                    <img src={"logo.png"} alt="logo" className="logo"/>
                </a>
            </header>
            <div className={"photographer-wrapper"}>
                <div className={"photographer-header"}>
                    <div className={"photographer-info"}>
                        <h1 className={"name"}>{photographerInformation.name}</h1>
                        <div>
                            <h3 className={"city"}>{photographerInformation.city}, {photographerInformation.country}</h3>
                            <p className={"tagline"}>{photographerInformation.label}</p>
                        </div>
                    </div>
                    <div className={"photographer-button-container"}>
                        <button onClick={() => {setModalOpen(true);}}
                                className={"photographer-contact-me-button"}>Contactez-moi</button>
                    </div>
                    {/*{modalOpen && <ContactModal setOpenModal={setModalOpen} />}*/}
                    <div>
                        <img className={"photographer-image-container"}
                             src={`/PhotographersIdPhotos/${photographerInformation.portrait}`}
                             alt=""/>'
                    </div>
                </div>
                <div className={"selector-wrapper"}>
                    <p>Trier par:</p>
                    <select id="">
                        <option value="">Popularité</option>
                        <option value="">Date</option>
                        <option value="">Titre</option>
                    </select>
                </div>
                <div className={"image-wrapper"}>
                    {photographersImage.map((image) => {
                        return (
                            <div className={"unique-image-container"} key={image.id}>
                                {image?.image?.includes("jpg") ? (
                                    <>
                                        <a>
                                            <img className={"image"} src={`/SamplePhotos/${photographerInformation.name}/${image.image}`} alt="image"/>
                                        </a>
                                    </>
                                ) :
                                        <video className={"image"} src={`/SamplePhotos/${photographerInformation.name}/${image.image}`} type="video/mp4"/>
                                }
                                <div className={"image-information"}>
                                    <p className={"image-title"}>{image.title}</p>
                                    <div style={{display:"flex", alignItems:"center", color:"#D3573C"}}>
                                        <p style={{marginRight:5}}>{image.likes}</p>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
