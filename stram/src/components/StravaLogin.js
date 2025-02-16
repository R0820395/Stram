import React from 'react';

const StravaLogin = () => {
	const handleLogin = () => {
		const clientId = process.env.REACT_APP_STRAVA_CLIENT_ID;
		console.log('Client ID:', clientId);

		// Use the full URL including the hash
		const redirectUri = `${window.location.origin}${window.location.pathname}#/callback`;
		const scope = 'activity:read_all';

		const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;

		console.log('Auth URL:', authUrl);
		window.location.href = authUrl;
	};

	return (
		<button onClick={handleLogin}>Connect with Strava</button>
	);
};

export default StravaLogin;
