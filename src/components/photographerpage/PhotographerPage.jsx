import React, {useEffect, useMemo, useState} from 'react';
import "./PhotographerPage.css";
import data from "/src/json/photographers.json";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp, faHeart} from "@fortawesome/free-solid-svg-icons";
import ContactModal from "../contactModal/ContactModal.jsx";
import ImagesModal from "../imagesModal/ImagesModal.jsx";

export default function PhotographerPage() {
    const params = useParams()
    let [photographersImage, setPhotographersImage] = useState([])
    const [photographerInformation, setPhotographerInformation] = useState([])
    const [imgNumberOfLikes, setImgNumberOfLikes] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [imagesModal, setImagesModal] = useState(false)
    const [openDropDownMenu, setOpenDropDownMenu] = useState(false)
    const [imagePicked, setImagePicked]= useState("")

    const [displayMenu, setDisplayMenu] = useState(false);


    const handleOpenSortMenu = () => {
        setOpenDropDownMenu(!openDropDownMenu);
    };

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



    function sortByPopularity(photographersImage) {
        return photographersImage.sort((a, b) => b.likes - a.likes);
    }

    function sortByDate(photographersImage) {
        photographersImage.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
    }

    function sortByTitle(photographersImage) {
        return photographersImage.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });
    }


    return (
        <div>
            {modalOpen &&
                <ContactModal
                photographerName={photographerInformation.name}
                setOpenModal={setModalOpen}
                aria-label="Contact form for photographer"
                />}
            {imagesModal &&
                <ImagesModal
                setOpenImagesModal={setImagesModal}
                photographerName={photographerInformation.name}
                allImages={photographersImage}
                image={imagePicked}
                />}


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
                        <button onClick={() => {setModalOpen(true)}}
                                className={"photographer-contact-me-button"}>Contactez-moi</button>
                    </div>
                    <div>
                        <img className={"photographer-image-container"}
                             src={`/PhotographersIdPhotos/${photographerInformation.portrait}`}
                             alt=""/>'
                    </div>
                </div>
                {!imagesModal ?
                <>
                </>
                : null
                }
                {/*<div style={imagesModal ? {display:"none"}: {display: "flex"}} className={"selector-wrapper"}>*/}
                {/*    <p style={{marginRight:15, marginTop:15}}>Trier par:</p>*/}
                {/*    <div className={"dropdown"} onClick={handleOpenSortMenu} aria-label="Open dropdown menu for sorting images" title="Sort images by popularity, date, or title">*/}
                {/*        <button className={"sort-button"} onClick={()=> sortByPopularity(photographersImage)}>Popularité  <FontAwesomeIcon icon={faChevronUp}/></button>*/}
                {/*        {openDropDownMenu ? (*/}
                {/*            <ul className="menu">*/}
                {/*                <li className="menu-item">*/}
                {/*                    <button onClick={()=> sortByDate(photographersImage)} className={"sort-button"}>Date</button>*/}
                {/*                </li>*/}
                {/*                <li className="menu-item">*/}
                {/*                    <button onClick={()=> sortByTitle(photographersImage)} className={"sort-button"}>Titre</button>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        ) : null}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div style={{ display: 'inline-block' }}>
                    <div
                        onMouseEnter={() => setDisplayMenu(true)}
                        onMouseLeave={() => setDisplayMenu(false)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: '#3498db',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '8px',
                            display: 'inline-block',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        Trier par
                    </div>
                    {displayMenu ? (
                        <ul style={{
                            position: 'absolute',
                            top: '40px',
                            left: '0',
                            backgroundColor: '#f9f9f9',
                            minWidth: '160px',
                            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                            padding: '12px 16px',
                            zIndex: '1',
                            display: 'block'
                        }}>
                            <li style={{ listStyle: 'none', margin: '8px 0' }}>Option 1</li>
                            <li style={{ listStyle: 'none', margin: '8px 0' }}>Option 2</li>
                            <li style={{ listStyle: 'none', margin: '8px 0' }}>Option 3</li>
                            <li style={{ listStyle: 'none', margin: '8px 0' }}>Option 4</li>
                        </ul>
                    ) : null}
                </div>
                <div className={"image-wrapper"}>
                    {photographersImage.map((image) => {

                        return (
                            <div className={"unique-image-container"} key={image.id}>
                                {image?.image?.includes("jpg") ? (
                                    <>
                                        <a onClick={() => {setImagesModal(true); setImagePicked(image.image)}}>
                                            <img className={"image"} src={`/SamplePhotos/${photographerInformation.name}/${image.image}`} aria-label={image.title} alt="image"/>
                                        </a>
                                    </>
                                ) :
                                        <video className={"image"} src={`/SamplePhotos/${photographerInformation.name}/${image?.video}`} aria-label={image.title} type="video/mp4"/>
                                }
                                <div className={"image-information"}>
                                    <p className={"image-title"}>{image.title}</p>
                                    <div style={{display:"flex", alignItems:"center", color:"#D3573C"}}>
                                        <p style={{marginRight:5}}>{image.likes}</p>
                                        <FontAwesomeIcon onClick={() => {
                                            setImgNumberOfLikes(imgNumberOfLikes + 1);
                                            image.likes += 1;
                                        }} aria-label="Like image" icon={faHeart} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={"photographer-stats"} style={imagesModal ? {display:"none"} : {display:"flex", width:"20%",borderRadius:4, padding:10, alignItems:"center",height:40, backgroundColor:"#D3573C"}}>
                        <p style={{flex:1}}>{imgNumberOfLikes}<FontAwesomeIcon style={{marginLeft:5}} icon={faHeart} /></p>
                        <p>{photographerInformation.price}€ / jour</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
