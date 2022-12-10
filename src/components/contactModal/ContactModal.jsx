import React,{useState} from "react";
import "./ContactModal.css";

function ContactModal({ setOpenModal, photographerName }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                {/*<div className="titleCloseBtn">*/}
                {/*    <button onClick={() => {setOpenModal(false);}}>*/}
                {/*        X*/}
                {/*    </button>*/}
                {/*</div>*/}
                <div className="title">
                    <h1 style={{color:"black"}}>Contactez-moi {photographerName}</h1>
                    <button onClick={() => {setOpenModal(false)}}>
                        X
                    </button>
                </div>
                <div className="body">
                    <form style={{gap:10}}>
                        <p>Prénom</p>
                        <input
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            // placeholder="Prénom"
                            type="text"
                            name="firstName"
                            required
                        />
                        <p>Nom</p>
                        <input
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            // placeholder="Nom"
                            type="text"
                            name="lastName"
                            required
                        />
                        <p>Email</p>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            // placeholder="Email"
                            type="email"
                            name="email"
                            required
                        />
                        <p>Message</p>
                        <input
                            style={{height:150}}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            // placeholder="Votre message"
                            type="text"
                            name="Message"
                            required
                        />
                    </form>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContactModal;