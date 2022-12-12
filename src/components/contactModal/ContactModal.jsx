import React,{useState} from "react";
import "./ContactModal.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faXmark} from "@fortawesome/free-solid-svg-icons";

function ContactModal({ setOpenModal, photographerName }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1 className={"contact-me"} style={{color:"black"}}>Contactez-moi {photographerName}</h1>
                    <FontAwesomeIcon className={"closeModalButton"} onClick={() => {setOpenModal(false)}} icon={faXmark} />
                </div>
                <div className="body">
                    <form style={{gap:10}}>
                        <p>Prénom</p>
                        <input
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            type="text"
                            name="firstName"
                            required
                        />
                        <p>Nom</p>
                        <input
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            type="text"
                            name="lastName"
                            required
                        />
                        <p>Email</p>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            required
                        />
                        <p>Message</p>
                        <input
                            style={{height:150}}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="text"
                            name="Message"
                            required
                        />
                    </form>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {setOpenModal(false);}} id="sendMessage">
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContactModal;