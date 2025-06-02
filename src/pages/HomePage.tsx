import React, { useEffect, useState } from "react";
import { LastFM } from "../services/apiClient";
import ArtistCard from "../components/ArtistCard";
import TrackCard from "../components/TrackCard";

const HomePage = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [artistsData, tracksData] = await Promise.all([
          LastFM.getTopArtists(),
          LastFM.getTopTracks()
        ]);
        
        console.log('Artists data:', artistsData);
        console.log('Tracks data:', tracksData);
        
        setArtists(artistsData);
        setTracks(tracksData);
      } catch (error: any) {
        console.error("Ошибка загрузки данных:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (error) {
    return (
      <div className="error-message">
        <h2>Ошибка загрузки данных</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Music</h1>

      <section aria-busy={loading} aria-live="polite">
        <h2 className="section-title">Hot right now</h2>
        <div className="artists-grid" role="list">
          {loading ? (
            Array(12).fill(0).map((_, i) => <ArtistCard key={i} skeleton />)
          ) : (
            artists.map((artist, index) => (
  <ArtistCard 
    key={artist.mbid || `artist-${index}`} 
    name={artist.name}
    image={artist.image?.[2]?.['#text']}
    genres={artist.tags?.tag ? 
      (Array.isArray(artist.tags.tag) 
        ? artist.tags.tag.slice(0,3).map((t: any) => t.name)
        : [artist.tags.tag.name]
      ) : undefined
    }
  />
            ))
          )}
        </div>
      </section>

      <section aria-busy={loading} aria-live="polite">
        <h2 className="section-title">Popular tracks</h2>
        <div className="tracks-list">
          {loading ? (
            Array(9).fill(0).map((_, i) => (
              <TrackCard key={i} skeleton /> 
            ))
          ) : (
            tracks.map((track, index) => (
              <TrackCard 
                key={track.mbid || `track-${index}`} 
                title={track.name}
                artist={track.artist?.name || track.artist}
                cover={track.image?.[2]?.['#text']}
                duration={track.duration ? parseInt(track.duration) : undefined}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;