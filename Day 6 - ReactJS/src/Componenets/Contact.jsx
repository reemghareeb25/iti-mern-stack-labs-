import './style.css';
import { FaPhoneAlt,  FaEnvelope } from 'react-icons/fa'; 

function Contact() {
    return (
        <div className="contact">
            <h2 className="section-title">Contact</h2>
            <div className="contact-item">
                <FaPhoneAlt className="contact-icon" />
                <p className="contact-text">+201 207 0000</p>
            </div>
            <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <p className="contact-text">reemelhatty@gmail.com</p>
            </div>
        </div>
    );
}

export default Contact;