import { useRef } from 'react'
import { Link } from 'react-router-dom'

import "../About/About.css"
import OmakaseRoom from "../../resources/omakase-room.jpg";
import Chef1 from "../../resources/chef-1.jpg";
import Chef2 from "../../resources/chef-2.jpg";
import AboutImg from "../../resources/about-parallax.jpg";
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
    let ref = useRef(null);
    let { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    let y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    let opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <div className='about-container' ref={ref}>
            <h1>About</h1>
            <motion.div className="about-img" style={{ y, opacity }}>
                <img src={AboutImg} alt="about-heading"/>
            </motion.div>
            <div className="bg-about" >
                <div className="about-omakase-container">
                    <div className="omakase-content">
                        <h3>About Omakase Sushi</h3>
                        <p>In 1994, the culinary journey of Shiro Kashiba began when he opened the iconic Shiro's Sushi Restaurant in the heart of Seattle's Belltown neighborhood. With a commitment to blending classical Japanese techniques with the bountiful offerings of the Pacific Northwest, Shiro's quickly became a culinary landmark, setting standards that others aspired to, according to the esteemed Zagat Guide.</p>
                        <p>After an illustrious 20-year legacy, Chef Kashiba passed the torch to a skilled culinary team led by Chef Jun Kobayashi, who now continues the restaurant's rich tradition of Edomae sushi craftsmanship. Under his guidance, Shiro's Sushi not only preserves its acclaimed heritage but also explores new heights in artisanal sushi, blending advanced training with diverse culinary experiences</p>
                    </div>
                    <div className="omakase-img-container">
                        <img src={OmakaseRoom} alt='logo' />
                    </div>
                </div>
                <div className="edomae-style-container">
                    <div className="edomae-content">
                        <h3>Edomae Style</h3>
                        <p>Step into the past of Japan's Edo Era, a time without refrigeration, where ingenious methods kept seafood from Tokyo Bay fresh. Techniques involving persimmon wood, bamboo leaves, wasabi root, pickled ginger, and vinegar were developed for safe seafood preparation and consumption. In modern translation, "Edomae" refers to the traditional Tokyo way of crafting sushi, using locally sourced fish.</p>
                        <p>At Omakase Sushi, we honor this legacy by focusing on local, seasonally available seafood and produce. Our chefs, overlooking the pristine waters of the Pacific Northwest, prioritize Washington and Oregon's treasures—salmon, geoduck, squid, oysters, clams, smelt, and Pacific albacore tuna. Extending our reach regionally, we bring you king crab from Alaska and wild prawns from Canada, culminating in a global selection of fresh fish that reflects our commitment to quality and authenticity.</p>
                        <p>Experience the essence of Edomae-style sushi at Omakase Sushi - where tradition meets innovation, and every bite is a celebration of culinary artistry.</p>
                        <div className="about-cta-buttons">
                            <Link to={"/contact"}>Reserve Your Table</Link>
                            <Link to={"/menu"}>Explore Our Menu</Link>
                        </div>
                    </div>
                    <div className="edomae-img-container">
                        <img src={Chef1} alt="sushi-chef"/>
                        <img src={Chef2} alt="sushi-chef"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About