import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";
import MenuImg from "../../resources/sushi-menu-parallax.jpg";
import { motion, useScroll, useTransform } from 'framer-motion';

const Menu = () => {
    const [activeLink, setActiveLink] = useState("all");

    const handleActiveLink = (type) => {
        setActiveLink(type);
    };

    let ref = useRef(null);
    let { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    let y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
    let opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <div className="menu-container" ref={ref}>
            <h1>Menu</h1>
            <motion.div className="bg-menu-img" style={{ y, opacity }}>
                <img src={MenuImg} alt="menu-background" />
            </motion.div>
            <div className="bg-menu">
                <section className='menu-navigation'>
                    <Link 
                        onClick={() => handleActiveLink("all")}
                        className={activeLink === "all" ? "active-link" : ""}
                        to={"/menu/all"}
                        >
                            All
                    </Link>

                    <Link 
                        onClick={() => handleActiveLink("set")}
                        className={activeLink === "set" ? "active-link" : ""}
                        to="/menu/set" 
                        >
                            Set
                    </Link>

                    <Link 
                        onClick={() => handleActiveLink("futomaki")}
                        className={activeLink === "futomaki" ? "active-link" : ""}
                        to="/menu/futomaki" 
                        >
                            Futomaki
                    </Link>

                    <Link
                        onClick={() => handleActiveLink("uramaki")}
                        className={activeLink === "uramaki" ? "active-link" : ""}
                        to="/menu/uramaki" 
                        >
                            Uramaki
                    </Link>

                    <Link 
                        onClick={() => handleActiveLink("sashimi")}
                        className={activeLink === "sashimi" ? "active-link" : ""}
                        to="/menu/sashimi" 
                        >
                            Sashimi
                    </Link>

                    <Link 
                        onClick={() => handleActiveLink("hosomaki")}
                        className={activeLink === "hosomaki" ? "active-link" : ""}
                        to="/menu/hosomaki" 
                        >
                            Hosomaki
                    </Link>

                    <Link
                        onClick={() => handleActiveLink("nigiri")}
                        className={activeLink === "nigiri" ? "active-link" : ""}
                        to="/menu/nigiri" 
                        >
                            Nigiri
                    </Link>
                </section>
            </div>
        </div>
    )
}

export default Menu