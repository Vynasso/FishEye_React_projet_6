import React, {useEffect, useMemo, useState} from "react";
import "./ImagesModal.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faXmark} from "@fortawesome/free-solid-svg-icons";

function ImagesModal({setOpenImagesModal, photographerName, media, allImages}) {

    const [currentMedia, setCurrentMedia] = useState(media)
    const {image, video} = currentMedia

    const mediaCount = useMemo(() => allImages.length, [allImages])


    console.log(media)
    // Function to go to the next image in the array
    const handleNextImage = () => {
        // Find the index of the current image in the array
        const currentIndex = allImages.indexOf(currentMedia)
        // If the current image is not the last image in the array, set the current image to the next image
        setCurrentMedia(allImages[(currentIndex + 1) % mediaCount])
    };

    // Function to go to the previous image in the array
    const handlePrevImage = () => {
        // Find the index of the current image in the array
        const currentIndex = allImages.indexOf(currentMedia)
        // If the current image is not the first image in the array, set the current image to the previous image
        setCurrentMedia(allImages[(currentIndex - 1 + mediaCount) % mediaCount])
    };

    return (
        <div className="modalBackground" aria-label="Image closeup view">
            <div className="imageModalContainer">
                <div className={"close-button-wrapper"}>
                    <FontAwesomeIcon onClick={() => {
                        setOpenImagesModal(false)
                    }}
                                     aria-label="image closeup view"
                                     icon={faXmark}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <FontAwesomeIcon className={"swipe-button"}
                                     style={{fontSize: 40, paddingLeft: 20, color: "#901C1C", cursor: "pointer"}}
                                     onClick={handlePrevImage} aria-label="Previous image" icon={faChevronLeft}/>
                    {image && (
                        <img className={"modal-image"} aria-label={"Lilac breasted roller"}
                             src={`/SamplePhotos/${photographerName}/${image}`} alt="image"/>
                    )}
                    {video && (
                        <video className={"video"} autoPlay={true} controls={true}
                               src={`/SamplePhotos/${photographerName}/${video}`} type="video/mp4"/>
                    )}
                    <FontAwesomeIcon className={"swipe-button"}
                                     style={{fontSize: 40, paddingRight: 20, color: "#901C1C", cursor: "pointer"}}
                                     onClick={handleNextImage} aria-label="Next image" icon={faChevronRight}/>
                </div>
            </div>
        </div>
    );
}

export default ImagesModal;
