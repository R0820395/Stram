import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StravaCallback = ({ setIsAuthenticated }) => {
	const [error, setError] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		console.log('StravaCallback: Component mounted');
		const searchParams = new URLSearchParams(location.search);
		const code = searchParams.get('code');
		console.log('Authorization code:', code);

		if (code) {
			exchangeToken(code);
		} else {
			console.error('No authorization code found in URL');
			setError('No authorization code found. Please try logging in again.');
		}
	}, [location]);

	const exchangeToken = async (code) => {
		console.log('Exchanging token...');
		try {
			const response = await axios.post('https://www.strava.com/oauth/token', {
				client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
				client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
				code: code,
				grant_type: 'authorization_code'
			});

			console.log('Token exchange response:', response.data);

			const { access_token, refresh_token } = response.data;

			localStorage.setItem('strava_access_token', access_token);
			localStorage.setItem('strava_refresh_token', refresh_token);

			console.log('Tokens stored in localStorage');
			setIsAuthenticated(true);
			console.log('setIsAuthenticated called with true');
			navigate('/');
		} catch (error) {
			console.error('Error exchanging token:', error.response ? error.response.data : error.message);
			setError('Failed to authenticate with Strava. Please try again.');
		}
	};

	return (
		<div>
			{error ? (
				<p>{error}</p>
			) : (
				<p>Processing Strava login...</p>
			)}
		</div>
	);
};

export default StravaCallback;
