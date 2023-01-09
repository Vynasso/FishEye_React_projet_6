import React, {useState} from "react";
import "./ContactModal.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faXmark} from "@fortawesome/free-solid-svg-icons";

function ContactModal({setOpenModal, photographerName}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="modalBackground" aria-label={"Contact me " + photographerName}>
            <div className="modalContainer">
                <div className="title">
                    <h1 className={"contact-me"} style={{color: "black"}}>Contactez-moi {photographerName}</h1>
                    <FontAwesomeIcon className={"closeModalButton"} aria-label="Close contact form" onClick={() => {
                        setOpenModal(false)
                    }} icon={faXmark}/>
                </div>
                <div className="body">
                    <form style={{gap: 10}}>
                        <p>Prénom</p>
                        <input
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            type="text"
                            name="firstName"
                            aria-label="First name"
                            required
                        />
                        <p>Nom</p>
                        <input
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            type="text"
                            name="lastName"
                            aria-label="Last name"
                            required
                        />
                        <p>Email</p>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            aria-label="Email"
                            required
                        />
                        <p>Message</p>
                        <textarea
                            aria-label={"Your message"}
                            style={{height: 150, width: "100%", borderRadius: 4}}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            name="Message"
                            rows={10}
                            required
                        ></textarea>
                    </form>
                </div>
                <div className="footer">
                    <button
                        aria-label="Send"
                        onClick={() => {
                            setOpenModal(false);
                        }} id="sendMessage">
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContactModal;