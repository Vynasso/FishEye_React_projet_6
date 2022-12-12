import React, {useState} from "react";
import "./ImagesModal.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faXmark} from "@fortawesome/free-solid-svg-icons";

function ImagesModal({setOpenImagesModal, photographerName, image}) {


    return (
        <div className="modalBackground">
            <div className="imageModalContainer">
                <div className={"close-button-wrapper"}>
                    <FontAwesomeIcon onClick={() => {
                        setOpenImagesModal(false)
                    }} icon={faXmark}/>
                </div>
                <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                    <FontAwesomeIcon style={{fontSize:40,paddingLeft:20,color:"#901C1C",cursor:"pointer"}} icon={faChevronLeft}/>
                    {image?.includes("jpg") ? (
                            <>
                                <img className={"modal-image"} src={`/SamplePhotos/${photographerName}/${image}`} alt="image"/>

                            </>
                        ) :
                        <video className={"image"} src={`/SamplePhotos/${photographerName}/${image.video}`} type="video/mp4"/>
                    }
                    <FontAwesomeIcon style={{fontSize:40,paddingRight:20, color:"#901C1C", cursor:"pointer"}} icon={faChevronRight}/>
                </div>
            </div>
        </div>
    );
}

export default ImagesModal;