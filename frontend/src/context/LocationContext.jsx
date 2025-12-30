import React, { createContext, useState, useContext, useEffect } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [denied, setDenied] = useState(false);
    const [address, setAddress] = useState('Detecting location...');

    const getAddress = async (lat, lng) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            if (data && data.address) {
                const { road, suburb, city, state, postcode, country } = data.address;
                const formattedAddress = [
                    road,
                    suburb,
                    city,
                    state,
                    postcode,
                    country
                ].filter(Boolean).join(', ');
                setAddress(formattedAddress);
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            setAddress(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
        }
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                getAddress(latitude, longitude);
                setDenied(false);
            },
            (error) => {
                console.error('Error getting location:', error);
                setDenied(true);
            }
        );
    };

    const searchAddress = async (query) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon, display_name } = data[0];
                return { lat: parseFloat(lat), lng: parseFloat(lon), address: display_name };
            }
            return null;
        } catch (error) {
            console.error('Error searching address:', error);
            return null;
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <LocationContext.Provider value={{
            userLocation,
            setUserLocation,
            denied,
            address,
            refreshLocation: getLocation,
            searchAddress
        }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocationContext must be used within a LocationProvider');
    }
    return context;
};
