import React, { useEffect, useState } from 'react';

const StravaLogin = () => {
	const [clientId, setClientId] = useState(null);

	useEffect(() => {
		// Try to get the client ID from the environment variable first
		let id = process.env.REACT_APP_STRAVA_CLIENT_ID;

		// If not found, try to get it from the window.STRAVA_CONFIG
		if (!id && window.STRAVA_CONFIG) {
			id = window.STRAVA_CONFIG.CLIENT_ID;
		}

		setClientId(id);
		console.log('Client ID:', id);
	}, []);

	const handleLogin = () => {
		if (!clientId) {
			console.error('Strava Client ID not found');
			return;
		}

		const redirectUri = encodeURIComponent('https://R0820395.github.io/stram/callback');
		const scope = 'activity:read_all';

		window.location = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
	};

	return (
		<button onClick={handleLogin} disabled={!clientId}>
			Connect with Strava
		</button>
	);
};

export default StravaLogin;
