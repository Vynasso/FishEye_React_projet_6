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
    const [imagePicked, setImagePicked] = useState("")

    const [displayMenu, setDisplayMenu] = useState(true);


    const handleOpenSortMenu = () => {
        setOpenDropDownMenu(!openDropDownMenu);
    };

    useEffect(() => {
        let userId = +params.user_id
        let photographer = data.photographers.filter(photographe => photographe.id === userId)
        setPhotographerInformation(photographer[0])
        let uniqueImage = data.media.filter(image => image.photographerId === userId)
        let numberOfLikes = 0
        for (let i = 0; i < uniqueImage.length; i++) {
            numberOfLikes += uniqueImage[i].likes
        }
        setImgNumberOfLikes(numberOfLikes)
        setPhotographersImage(uniqueImage)
    }, [])


    // function sortByPopularity(photographersImage) {
    //     console.log("popularity")
    //     return photographersImage.sort((a, b) => b.likes - a.likes);
    // }
    //
    // function sortByDate(photographersImage) {
    //     console.log("date")
    //     photographersImage.sort((a, b) => {
    //         const dateA = new Date(a.date);
    //         const dateB = new Date(b.date);
    //         return dateA - dateB;
    //     });
    // }
    //
    // function sortByTitle(photographersImage) {
    //     console.log("title")
    //     return photographersImage.sort((a, b) => {
    //         if (a.title < b.title) return -1;
    //         if (a.title > b.title) return 1;
    //         return 0;
    //     });
    // }

    function sortByPopularity(photographersImage) {
        console.log("popularity")
        let sortedArray = photographersImage.sort((a, b) => b.likes - a.likes);
        setPhotographersImage(sortedArray);
    }

    function sortByDate(photographersImage) {
        console.log("date")
        let sortedArray = photographersImage.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
        setPhotographersImage(sortedArray);
    }

    function sortByTitle(photographersImage) {
        console.log("title")
        let sortedArray = photographersImage.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });
        setPhotographersImage(sortedArray);
    }

    function toggleModal() {
        setModalOpen(!modalOpen)
        document.body.classList.toggle("modal-open")
    }

    function toggleImageModal() {
        setImagesModal(!imagesModal)
        document.body.classList.toggle("modal-open")
    }


    return (
        <div>
            {modalOpen &&
                <ContactModal
                    photographerName={photographerInformation.name}
                    setOpenModal={toggleModal}
                    aria-label="Contact Me"
                />}
            {imagesModal &&
                <ImagesModal
                    setOpenImagesModal={toggleImageModal}
                    photographerName={photographerInformation.name}
                    allImages={photographersImage}
                    media={{
                        ...imagePicked,
                        url: imagePicked.image || imagePicked.video
                    }}
                />}


            <header>
                <a href="/">
                    <img src={"logo.png"} alt="Fisheye Home page" aria-label={"Fisheye Home page"} className="logo"/>
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
                    <div aria-label="Contact Me" className={"photographer-button-container"}>
                        <button onClick={() => {
                            toggleModal()
                        }}
                                className={"photographer-contact-me-button"}>Contactez-moi
                        </button>
                    </div>
                    <div>
                        <img className={"photographer-image-container"}
                             aria-label={photographerInformation.name}
                             src={`/PhotographersIdPhotos/${photographerInformation.portrait}`}
                             alt=""/>'
                    </div>
                </div>
                {!imagesModal ?
                    <>
                    </>
                    : null
                }
                <div style={{display: 'inline-block'}}
                     onMouseEnter={() => setDisplayMenu(true)}
                     onMouseLeave={() => setDisplayMenu(false)}
                >
                    <div
                        style={{
                            cursor: 'pointer',
                            color: 'black',
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
                        <ul
                            style={{
                                position: 'absolute',
                                top: "438px",
                                left: "165px",
                                backgroundColor: '#901C1C',
                                minWidth: '120px',
                                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                                padding: '12px 16px',
                                zIndex: '1',
                                display: 'block',
                                borderRadius: "4px"
                            }}>
                            <li
                                style={{listStyle: 'none', margin: '8px 0'}}
                                onClick={() => sortByPopularity(photographersImage)}>
                                <div style={{
                                    color: '#FAFAFA',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    padding: "6px"
                                }}>Popularit??<FontAwesomeIcon
                                    style={{marginLeft: 10}} icon={faChevronUp}/>
                                </div>
                                <div style={{
                                    height: '1px',
                                    width: '100%',
                                    backgroundColor: '#FAFAFA',
                                    margin: '6px 0'
                                }}/>
                            </li>
                            <li
                                // onMouseEnter={() => setDisplayMenu(true)}
                                // onMouseLeave={() => setDisplayMenu(false)}
                                style={{listStyle: 'none', margin: '8px 0'}}
                                onClick={() => sortByDate(photographersImage)}>
                                <div
                                    style={{color: '#FAFAFA', fontSize: '16px', fontWeight: '600', padding: "6px"}}>Date
                                </div>
                                <div style={{
                                    height: '1px',
                                    width: '100%',
                                    backgroundColor: '#FAFAFA',
                                    margin: '6px 0'
                                }}/>
                            </li>
                            <li
                                // onMouseEnter={() => setDisplayMenu(true)}
                                // onMouseLeave={() => setDisplayMenu(false)}
                                style={{listStyle: 'none', margin: '8px 0'}}
                                onClick={() => sortByTitle(photographersImage)}>
                                <div style={{
                                    color: '#FAFAFA',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginLeft: "4px",
                                    paddingTop: "6px"
                                }}>Titre
                                </div>
                            </li>
                        </ul>
                    ) : null}
                </div>
                <div className={"image-wrapper"}>
                    {photographersImage.map((image) => {

                        return (
                            <div className={"unique-image-container"} key={image.id}>
                                {image?.image?.includes("jpg") ? (
                                        <a onClick={() => {
                                            toggleImageModal();
                                            setImagePicked(image)
                                        }}>
                                            <img className={"image"}
                                                 src={`/SamplePhotos/${photographerInformation.name}/${image.image}`}
                                                 aria-label={image.title} alt="image"/>
                                        </a>

                                    ) :
                                    <a onClick={() => {
                                        toggleImageModal();
                                        setImagePicked(image)
                                    }}>
                                        <video className={"image"}
                                               src={`/SamplePhotos/${photographerInformation.name}/${image?.video}`}
                                               aria-label={image.title} type="video/mp4"/>
                                    </a>

                                }
                                <div className={"image-information"}>
                                    <p className={"image-title"}>{image.title}</p>
                                    <div style={{display: "flex", alignItems: "center", color: "#D3573C"}}>
                                        <p style={{marginRight: 5}}>{image.likes}</p>
                                        <FontAwesomeIcon onClick={() => {
                                            setImgNumberOfLikes(imgNumberOfLikes + 1);
                                            image.likes += 1;
                                        }} aria-label="Likes" icon={faHeart}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={"photographer-stats"} style={imagesModal ? {display: "none"} : {
                        display: "flex",
                        width: "20%",
                        borderRadius: 4,
                        padding: 10,
                        alignItems: "center",
                        height: 40,
                        backgroundColor: "#D3573C"
                    }}>
                        <p style={{flex: 1}}>{imgNumberOfLikes}<FontAwesomeIcon style={{marginLeft: 5}} icon={faHeart}/>
                        </p>
                        <p>{photographerInformation.price}??? / jour</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
