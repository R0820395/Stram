import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StravaData = ({ setActivities }) => {
	const [accessToken, setAccessToken] = useState(localStorage.getItem('strava_access_token'));

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
			return newAccessToken;
		} catch (error) {
			console.error('Error refreshing token:', error);
			throw error;
		}
	};

	const fetchActivities = async (token) => {
		const perPage = 200;
		let page = 1;
		let allActivities = [];

		while (true) {
			try {
				const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
					headers: { 'Authorization': `Bearer ${token}` },
					params: { per_page: perPage, page: page }
				});

				const activities = response.data;
				if (activities.length === 0) break;

				allActivities = allActivities.concat(activities);
				page++;

				await new Promise(resolve => setTimeout(resolve, 100));
			} catch (error) {
				if (error.response && error.response.status === 401) {
					// Token expired, refresh and try again
					token = await refreshToken();
					continue;
				}
				console.error('Error fetching Strava data:', error);
				break;
			}
		}

		console.log(`Total activities fetched: ${allActivities.length}`);
		return allActivities;
	};

	useEffect(() => {
		const getActivities = async () => {
			try {
				let token = accessToken;
				if (!token) {
					token = await refreshToken();
				}
				const activities = await fetchActivities(token);
				setActivities(activities);
			} catch (error) {
				console.error('Failed to fetch activities:', error);
			}
		};

		getActivities();
	}, [setActivities]);

	return null;
};

export default StravaData;
