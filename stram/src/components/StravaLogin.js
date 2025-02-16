const StravaLogin = () => {
	const handleLogin = () => {
		const clientId = process.env.REACT_APP_STRAVA_CLIENT_ID;
		console.log('Client ID:', process.env.REACT_APP_STRAVA_CLIENT_ID);

		const redirectUri = `${window.location.origin}/stram/#/callback`;
		const scope = 'activity:read_all';

		window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;
	};

	return (
		<button onClick={handleLogin}>Connect with Strava</button>
	);
};
export default StravaLogin;