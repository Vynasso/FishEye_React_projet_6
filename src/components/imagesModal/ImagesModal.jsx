import React, {useEffect, useState} from "react";
import "./ImagesModal.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faXmark} from "@fortawesome/free-solid-svg-icons";

function ImagesModal({setOpenImagesModal, photographerName, image, allImages}) {

    // Add state to keep track of the current image
    const [currentImage, setCurrentImage] = useState(image);

    // Use effect to update the current image when the allImages prop changes
    useEffect(() => {
        setCurrentImage(image);
        console.log(currentImage)
    }, [image]);

    // Function to go to the next image in the array
    const handleNextImage = () => {
        // Find the index of the current image in the array
        const currentIndex = allImages.indexOf(currentImage);
        // If the current image is not the last image in the array, set the current image to the next image
        if (currentIndex < allImages.length - 1) {
            setCurrentImage(allImages[currentIndex + 1]);
        }
    };

    // Function to go to the previous image in the array
    const handlePrevImage = () => {
        // Find the index of the current image in the array
        const currentIndex = allImages.indexOf(currentImage);
        // If the current image is not the first image in the array, set the current image to the previous image
        if (currentIndex > 0) {
            setCurrentImage(allImages[currentIndex - 1]);
        }
    };

    return (
        <div className="modalBackground" aria-label="Image modal">
            <div className="imageModalContainer">
                <div className={"close-button-wrapper"}>
                    <FontAwesomeIcon onClick={() => {
                        setOpenImagesModal(false)
                    }}
                                     aria-label="Close image modal"
                                     icon={faXmark}
                    />
                </div>
                <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                    <FontAwesomeIcon className={"swipe-button"} style={{fontSize:40,paddingLeft:20,color:"#901C1C",cursor:"pointer"}}  onClick={handlePrevImage} aria-label="Previous image" icon={faChevronLeft}/>
                    {currentImage.image?.includes("jpg") ? (
                            <>
                                <img className={"modal-image"} src={`/SamplePhotos/${photographerName}/${currentImage.image}`} alt="image"/>

                            </>
                        ) :
                        <video className={"video"} autoPlay={true} controls={true} src={`/SamplePhotos/${photographerName}/${currentImage.video}`} type="video/mp4"/>
                    }
                    <FontAwesomeIcon className={"swipe-button"} style={{fontSize:40,paddingRight:20, color:"#901C1C", cursor:"pointer"}}  onClick={handleNextImage} aria-label="Next image" icon={faChevronRight}/>
                    <p>{image.title}</p>
                </div>
            </div>
        </div>
    );
}

export default ImagesModal;
