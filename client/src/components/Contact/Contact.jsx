import React, { useRef } from 'react'

import "./Contact.css"
import ContactImg from "../../resources/sushi-nigiri-parallax.jpg";
import { motion, useScroll, useTransform } from 'framer-motion';


const Contact = () => {
    let ref = useRef(null);
    let { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    let y = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
    let opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const onContactSubmit = async(e) => {
        console.log(e);
    }
    return (
        <div className='container-contact' ref={ref}>
            <h1>Contact</h1>
            <motion.div className="contact-img" style={{ y, opacity }}>
                <img src={ContactImg} alt="about-heading"/>
            </motion.div>

            <div className="bg-contact">
                <div className="contact-content-container">
                    <div className="contact-info-container">
                        <div  className='addresses-section'>
                            <h4>Omakase sushi restaurant</h4>
                            <p>1059 NW Corporate Dr</p>
                            <p>Phone: (503) 233-3878</p>
                            <p>E-mail: contact@omakse.com</p>
                        </div>
                        <div className='business-hours'>
                            <p className='business-title'>Business hours</p>
                            <p>Dine-in M-Su 4:30PM - 10:00PM (Last Order 9:15PM)</p>
                            <p>Takeout/Delivery 5:00PM-8:30PM</p>
                            <p>We are open 7 days a week</p>
                            <p>(closed on New Year's Day, Memorial Day, July 4th, Labor Day, Thanksgiving Day and Christmas Day)</p>
                        </div>
                        <div className='contact-us'>
                            <p className='contact-title'>Contact us</p>
                            <p>We value honest comments and feedback from our guests. Please feel free to contact us using the contact form.</p>
                        </div>
                    </div>
                    <div className="contact-form-container">
                        <h4>Contact form</h4>
                        <p>Please do not use this form for making reservations.</p>
                        <form onSubmit={onContactSubmit}>
                            <label htmlFor="contact-name">Your Name</label>
                            <input type="text" name='contact-name' />
                            <label htmlFor="contact-email">Your Email</label>
                            <input type="email" name='contact-email' />
                            <label htmlFor="contact-confirmEmail">Confirm Your Email (Do not copy & paste)</label>
                            <input type="email" name='contact-confirmEmail' />
                            <label htmlFor="contact-subject">Subject</label>
                            <input type="text" name='contact-subject' />
                            <label htmlFor="contact-message">Your Message</label>
                            <textarea type="text" name='contact-message' />
                            <label htmlFor="contact-quiz">
                                Simple Quiz before sending your message
                                <br />
                                <strong>5 + 4 = ?</strong>
                            </label>
                            <input type="text" name='contact-quiz' />
                            <input type="submit" value="Send" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact