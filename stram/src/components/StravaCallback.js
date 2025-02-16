import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StravaCallback = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');

		if (code) {
			exchangeToken(code);
		}
	}, []);

	const exchangeToken = async (code) => {
		try {
			const response = await axios.post('https://www.strava.com/oauth/token', {
				client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
				client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
				code: code,
				grant_type: 'authorization_code'
			});

			const { access_token, refresh_token } = response.data;

			// Store tokens in localStorage
			localStorage.setItem('strava_access_token', access_token);
			localStorage.setItem('strava_refresh_token', refresh_token);

			// Redirect to main app page
			navigate('/');
		} catch (error) {
			console.error('Error exchanging token:', error);
		}
	};

	return <div>Processing Strava login...</div>;
};

export default StravaCallback;
