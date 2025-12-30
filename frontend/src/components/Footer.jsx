import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                            INFRA <span className="text-blue-600">SENSE</span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            Empowering cities with real-time intelligence and proactive infrastructure management.
                            Building the future of urban governance.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Useful Links</h4>
                        <ul className="space-y-4">
                            {['Smart City Mission', 'Digital India', 'Ministry of Housing', 'Urban Planning Portal', 'Citizen Safety'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Governance */}
                    <div>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Governance</h4>
                        <ul className="space-y-4">
                            {['Accessibility', 'Privacy Policy', 'Terms of Service', 'Copyright Guide', 'Data Policy'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Contact Control</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <span className="text-blue-600">📍</span>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">Central Operations Hub</p>
                                    <p className="text-xs text-gray-500">Suite 402, Urban Plaza, Sector 12</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-blue-600">📞</span>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">Emergency Hotline</p>
                                    <p className="text-xs text-gray-500">1800-INFRA-HELP</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        © 2025 INFRA SENSE • AN URBAN INTELLIGENCE INITIATIVE
                    </p>
                    <div className="flex gap-8">
                        <span className="text-xs font-black text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full uppercase tracking-tighter">SECURED BY AI-NODE</span>
                        <span className="text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full uppercase tracking-tighter">SYSTEM: OPTIMIZED</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
