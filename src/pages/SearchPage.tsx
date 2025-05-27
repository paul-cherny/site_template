import React, { useState } from "react";
import { LastFM } from "../services/apiClient";
import ArtistCard from "../components/ArtistCard";
import TrackCard from "../components/TrackCard";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<{
    artists: any[];
    albums: any[];
    tracks: any[];
  }>({ artists: [], albums: [], tracks: [] });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const [artists, albums, tracks] = await Promise.all([
        LastFM.search('artist', searchQuery),
        LastFM.search('album', searchQuery),
        LastFM.search('track', searchQuery)
      ]);

      setResults({ artists, albums, tracks });
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search artists, tracks, albums..."
        />
        <button type="submit">Search</button>
      </form>

<div className="search-results">
  {results.artists.length > 0 && (
    <section className="results-section">
      <h2>Artists</h2>
      <div className="artists-grid">
        {results.artists.map((artist, index) => {
          interface Tag {
            name: string;
          }

          const genreNames = artist.tags?.tag?.slice(0, 3).map((t: Tag) => t.name).join(', ') || '';

          return (
            <ArtistCard
              key={artist.mbid || index}
              name={artist.name}
              image={artist.image?.[2]?.["#text"]}
              genres={genreNames}
            />
          );
        })}
      </div>
    </section>
        )}

        {results.albums.length > 0 && (
          <section className="results-section">
            <h2>Albums</h2>
            <div className="albums-grid">
              {results.albums.map((album, index) => (
                <div key={album.mbid || index} className="album-card">
                  <img 
                    src={album.image?.[2]?.["#text"] || '/placeholder-album.png'} 
                    alt={album.name}
                  />
                  <div className="album-info">
                    <h3>{album.name}</h3>
                    <p>{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {results.tracks.length > 0 && (
          <section className="results-section">
            <h2>Tracks</h2>
            <div className="tracks-list">
              {results.tracks.map((track, index) => (
                <TrackCard
                  key={track.mbid || index}
                  title={track.name}
                  artist={track.artist}
                  cover={track.image?.[0]?.["#text"]}
                  duration={track.duration}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {!results.artists.length && 
       !results.albums.length && 
       !results.tracks.length && (
        <div className="no-results">
          No results found for "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default SearchPage