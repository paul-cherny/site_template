import React, { useEffect, useState } from "react";
import { LastFM } from "../services/apiClient";
import ArtistCard from "../components/ArtistCard";
import TrackCard from "../components/TrackCard";

const HomePage = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [artistsData, tracksData] = await Promise.all([
          LastFM.getTopArtists(),
          LastFM.getTopTracks()
        ]);
        
        setArtists(artistsData);
        setTracks(tracksData);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="container">
      <h1>Music</h1>

      <section>
        <h2 className="section-header">Hot right now</h2>
        <div className="artists-grid">
          {loading ? (
            Array(12).fill(0).map((_, i) => <ArtistCard key={i} skeleton />)
          ) : (
            artists.map(artist => (
              <ArtistCard 
                key={artist.mbid} 
                name={artist.name}
                image={artist.image[2]?.['#text']}
                genres={artist.tags?.tag?.slice(0,3).map((t: any) => t.name)}
              />
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="section-header">Popular tracks</h2>
        // В секции Popular tracks
<div className="tracks-list">
  {loading ? (
    Array(9).fill(0).map((_, i) => (
      <TrackCard key={i} skeleton /> 
    ))
  ) : (
    tracks.map(track => (
      <TrackCard key={track.mbid} track={track} />
    ))
  )}
</div>
      </section>
    </div>
  );
};

export default HomePage;