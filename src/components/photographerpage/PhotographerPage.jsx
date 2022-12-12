import React, {useEffect, useMemo, useState} from 'react';
import "./PhotographerPage.css";
import data from "/src/json/photographers.json";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp, faHeart} from "@fortawesome/free-solid-svg-icons";
import ContactModal from "../contactModal/ContactModal.jsx";

export default function PhotographerPage() {
    const params = useParams()
    const [photographersImage, setPhotographersImage] = useState([])
    const [photographerInformation, setPhotographerInformation] = useState([])
    const [imgNumberOfLikes, setImgNumberOfLikes] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [openDropDownMenu, setOpenDropDownMenu] = useState(false)

    const [popularityFilter, setPopularityFilter] = useState(false)
    const [dateFilter, setDateFilter] = useState(false)
    const [titleFilter, setTitleFilter] = useState(false)

    const handleOpenSortMenu = () => {
        setOpenDropDownMenu(!openDropDownMenu);
    };

    useEffect(() => {
        let userId = +params.user_id
        // console.log(data.media)
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


    // let startDate = Date();
    // let endDate = '2016-01-31';
    // let filteredImageByDate = photographersImage.date.filter(function(item) {
    //     return item.date >= startDate && item.date <= endDate;
    // });


    const filteringImage = (()=> {
        console.log("check")
        if(!popularityFilter || !dateFilter || !titleFilter) return photographersImage
        if(popularityFilter) return photographersImage.likes.sort(function(a,b){
            return a - b;
        })
        if(dateFilter) return photographersImage.date.sort(function (imageA,imageB){
            return imageA - imageB;
        })
        if(titleFilter) return photographersImage.title.sort(function(titleA, titleB){
            return titleA - titleB
        })
    })

    const sortByPopularity = (()=> {
        console.log("check")
        const sortedImage = [...photographersImage].sort((a,b)=>
        a > b ? 1 : -1);
        setPhotographersImage(sortedImage)
    })

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
                    <div>
                        <img className={"photographer-image-container"}
                             src={`/PhotographersIdPhotos/${photographerInformation.portrait}`}
                             alt=""/>'
                    </div>
                </div>
                <div className={"selector-wrapper"}>
                    <p style={{marginRight:15}}>Trier par:</p>
                    <div className={"dropdown"}>
                        <button className={"sort-button"} onClick={handleOpenSortMenu}>Popularité  <FontAwesomeIcon icon={faChevronUp}/></button>
                        {openDropDownMenu ? (
                            <ul className="menu">
                                <li className="menu-item">
                                    <button className={"sort-button"}>Date</button>
                                </li>
                                <li className="menu-item">
                                    <button className={"sort-button"}>Titre</button>
                                </li>
                            </ul>
                        ) : null}
                </div>
                </div>
                <div className={"image-wrapper"}>
                    {photographersImage
                        .map((image) => {
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
                                        <FontAwesomeIcon onClick={()=> setImgNumberOfLikes(imgNumberOfLikes + 1)} icon={faHeart} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={"photographer-stats"} style={{display:"flex", width:"20%",borderRadius:4, padding:10, alignItems:"center",height:40, backgroundColor:"#D3573C"}}>
                        <p style={{flex:1}}>{imgNumberOfLikes}<FontAwesomeIcon style={{marginLeft:5}} icon={faHeart} /></p>
                        <p>{photographerInformation.price}€ / jour</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
