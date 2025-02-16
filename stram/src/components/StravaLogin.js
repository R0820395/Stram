import React from 'react';

const StravaLogin = () => {
	const handleLogin = () => {
		const clientId = window.STRAVA_CONFIG.CLIENT_ID
		console.log('Client ID:', window.STRAVA_CONFIG.CLIENT_ID);
		const redirectUri = encodeURIComponent('https://R0820395.github.io/stram/callback');
		const scope = 'activity:read_all';

		window.location = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
	};

	return (
		<button onClick={handleLogin}>Connect with Strava</button>
	);
};

export default StravaLogin;
