import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StravaData = ({ setActivities }) => {
	const [accessToken, setAccessToken] = useState(localStorage.getItem('strava_access_token'));

	const perPage = 200; // Maximum allowed by Strava API
	let page = 1;
	let allActivities = [];

	const fetchActivities = async () => {
		while (true) {
			try {
				const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
					headers: { 'Authorization': `Bearer ${accessToken}` },
					params: {
						per_page: perPage,
						page: page
					}
				});

				const activities = response.data;

				if (activities.length === 0) {
					// No more activities to fetch
					break;
				}

				allActivities = allActivities.concat(activities);
				page++;

				// Optional: add a small delay to avoid hitting rate limits
				await new Promise(resolve => setTimeout(resolve, 100));

			} catch (error) {
				console.error('Error fetching Strava data:', error);
				break;
			}
		}

		console.log(`Total activities fetched: ${allActivities.length}`);
		return allActivities;
	};

	useEffect(() => {
		const getActivities = async () => {
			const activities = await fetchActivities();
			setActivities(activities);
		};

		getActivities();
	}, [accessToken, setActivities]);

	const refreshToken = async () => {
		try {
			const refreshToken = localStorage.getItem('strava_refresh_token');
			const response = await axios.post('https://www.strava.com/oauth/token', {
				client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
				client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
				grant_type: 'refresh_token',
				refresh_token: refreshToken
			});

			const newAccessToken = response.data.access_token;
			localStorage.setItem('strava_access_token', newAccessToken);
			setAccessToken(newAccessToken);
		} catch (error) {
			console.error('Error refreshing token:', error);
		}
	};

	return null;
};

export default StravaData;
