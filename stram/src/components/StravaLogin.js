import React from 'react';

const StravaLogin = () => {
	const handleLogin = () => {
		const clientId = process.env.REACT_APP_STRAVA_CLIENT_ID;
		const redirectUri = encodeURIComponent('http://localhost:3000/callback');
		const scope = 'activity:read_all';

		window.location = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
	};

	return (
		<button onClick={handleLogin}>Connect with Strava</button>
	);
};

export default StravaLogin;
