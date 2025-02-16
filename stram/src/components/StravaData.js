import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StravaCallback = ({ setIsAuthenticated }) => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const code = searchParams.get('code');

		if (code) {
			exchangeToken(code);
		}
	}, [location]);

	const exchangeToken = async (code) => {
		try {
			const response = await axios.post('https://www.strava.com/oauth/token', {
				client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
				client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
				code: code,
				grant_type: 'authorization_code'
			});

			const { access_token, refresh_token } = response.data;

			localStorage.setItem('strava_access_token', access_token);
			localStorage.setItem('strava_refresh_token', refresh_token);

			setIsAuthenticated(true);
			navigate('/');
		} catch (error) {
			console.error('Error exchanging token:', error);
		}
	};

	return <div>Processing Strava login...</div>;
};

export default StravaCallback;
