import React from 'react';
import "./Terms.css";

export const Terms = () => {
    return (
        <div className='terms-of-service-container'>
            <h1>Terms of Service for Omakase Sushi Restaurant</h1>
            <p>Last updated: 13.09.2024</p>
            <ol className='parent-list'>
                <li>
                    <h2>Acceptance of Terms</h2>
                    <p>By accessing or using the services of Omakase Sushi Restaurant, including our website, dining at our restaurant, or ordering takeout or delivery, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                </li>
                <li>
                    <h2>Changes to Terms</h2>
                    <p>We reserve the right to modify these terms at any time. We will always post the most current version on our website. By continuing to use our services after changes have been made, you accept the modified terms.</p>
                </li>
                <li>
                    <h2>Restaurant Services</h2>
                    <ol className='child-list'>
                        <li>
                            <h3>Reservations</h3>
                            <ul>
                                <li>Reservations are recommended but not always required.</li>
                                <li>We reserve the right to cancel or modify reservations at our discretion.</li>
                                <li>A fee may be charged for no-shows or late cancellations.</li>
                            </ul>
                        </li>
                        <li>
                            <h3>Menu and Pricing</h3>
                            <ul>
                                <li>All menu items and prices are subject to change without notice.</li>
                                <li>We strive to keep our website and menus updated, but cannot guarantee accuracy at all times.</li>
                            </ul>
                        </li>
                        <li>
                            <h3>Food Allergies and Dietary Restrictions</h3>
                            <ul>
                                <li>Customers with food allergies or specific dietary requirements should inform our staff before ordering.</li>
                                <li>While we take precautions, we cannot guarantee that any menu item is completely free of allergens.</li>
                            </ul>
                        </li>
                        <li>
                            <h3>Customer Conduct</h3>
                            <ul>
                                <li>We reserve the right to refuse service or ask customers to leave if their behavior is disruptive, threatening, or violates our policies.</li>
                            </ul>
                        </li>
                    </ol>
                </li>
                <li>
                    <h2>Online Ordering and Delivery</h2>
                    <ol>
                        <li>
                            <h3>Accuracy of Information</h3>
                            <ul>
                                <li>You are responsible for providing accurate information when placing an order.</li>
                                <li>We are not responsible for errors resulting from inaccurate information provided by the customer.</li>
                            </ul>
                        </li>
                        <li>
                            <h3>Payment</h3>
                            <ul>
                                <li>Payment is due at the time of ordering for online and delivery orders.</li>
                                <li>For dine-in services, payment is due upon completion of the meal.</li>
                            </ul>
                        </li>
                        <li>
                            <h3>Delivery</h3>
                            <ul>
                                <li>Delivery times are estimates and may vary due to factors beyond our control.</li>
                                <li>We are not responsible for orders that arrive late, cold, or damaged due to circumstances beyond our control.</li>
                            </ul>
                        </li>
                    </ol>
                </li>
                <li>
                    <h2>Intellectual Property</h2>
                    <p>All content on our website, including text, graphics, logos, and images, is the property of Omakase Sushi Restaurant and protected by copyright laws.</p>
                </li>
                <li>
                    <h2>Limitation of Liability</h2>
                    <p>Omakase Sushi Restaurant is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services.</p>
                </li>
                <li>
                    <h2>Governing Law</h2>
                    <p>These Terms of Service are governed by the laws of USA. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in New York.</p>
                </li>
                <li>
                    <h2>Severability</h2>
                    <p>If any provision of these Terms of Service is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect and enforceable.</p>
                </li>
                <li>
                    <h2>Contact Information</h2>
                    <p>If you have any questions about these Terms of Service, please contact us at:</p>
                </li>
            </ol>
                    <p>Omakase Sushi Restaurant</p>
                    <p>1059 NW Corporate Dr</p>
                    <p>Email: contact@omakse.com</p>
                    <p>Phone: (503) 233-3878</p>
        </div>
    )
}
