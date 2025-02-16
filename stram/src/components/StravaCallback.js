import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StravaCallback = ({ setIsAuthenticated }) => {
	const [status, setStatus] = useState('Processing...');
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const logAndSetStatus = (message) => {
			console.log(message);
			setStatus(message);
		};

		logAndSetStatus('StravaCallback: Component mounted');
		//logAndSetStatus(`Location: ${JSON.stringify(location)}`);

		const params = new URLSearchParams(location.search);
		const hashParams = new URLSearchParams(location.hash.slice(1));

		const code = params.get('code') || hashParams.get('code');

		if (code) {
			//logAndSetStatus(`Authorization code: ${code}`);
			exchangeToken(code);
		} else {
			logAndSetStatus('No authorization code found in URL');
		}
	}, [location]);

	const exchangeToken = async (code) => {
		const logAndSetStatus = (message) => {
			console.log(message);
			setStatus(message);
		};

		logAndSetStatus('Exchanging token...');
		try {
			const response = await axios.post('https://www.strava.com/oauth/token', {
				client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
				client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
				code: code,
				grant_type: 'authorization_code'
			});

			logAndSetStatus(`Token exchange response: ${JSON.stringify(response.data)}`);

			const { access_token, refresh_token } = response.data;

			localStorage.setItem('strava_access_token', access_token);
			localStorage.setItem('strava_refresh_token', refresh_token);

			//logAndSetStatus('Tokens stored in localStorage');
			//logAndSetStatus(`Access token in localStorage: ${localStorage.getItem('strava_access_token')}`);

			setIsAuthenticated(true);
			logAndSetStatus('setIsAuthenticated called with true');
			navigate('/');
		} catch (error) {
			logAndSetStatus(`Error exchanging token: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
		}
	};

	return <div>{status}</div>;
};

export default StravaCallback;
