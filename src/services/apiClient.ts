const API_KEY = "18fa1e9cc8367045eef39fed45670eda";
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

const fetchData = async <T>(method: string, params: Record<string, string | number>): Promise<T> => {
  const query = new URLSearchParams({
    method,
    api_key: API_KEY,
    format: 'json',
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    )
  });

  const response = await fetch(`${BASE_URL}?${query}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const LastFM = {
  getTopArtists: (limit = 12) => 
    fetchData<{ artists: { artist: any[] } }>('chart.gettopartists', { limit })
      .then(data => data.artists.artist),

  getTopTracks: (limit = 9) =>
    fetchData<{ tracks: { track: any[] } }>('chart.gettoptracks', { limit })
      .then(data => data.tracks.track),

  search: (type: 'artist'|'album'|'track', query: string, limit = 20) =>
    fetchData<any>(`${type}.search`, { [type]: query, limit })
      .then(data => data.results[`${type}matches`][type])
};