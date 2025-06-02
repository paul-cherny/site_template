import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LastFM } from "../services/apiClient";
import ArtistCard from "../components/ArtistCard";
import TrackCard from "../components/TrackCard";

interface Tag {
  name: string;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<{
    artists: any[];
    albums: any[];
    tracks: any[];
  }>({ artists: [], albums: [], tracks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
      performSearch(queryFromUrl);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const [artists, albums, tracks] = await Promise.all([
        LastFM.search('artist', query),
        LastFM.search('album', query),
        LastFM.search('track', query)
      ]);

      setResults({ artists, albums, tracks });
    } catch (error: any) {
      console.error("Search error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  return (
    <div className="container">
      <h1 className="page-title">Search Music</h1>
      
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search artists, tracks, albums..."
          className="search-input"
        />
        <button type="submit" disabled={loading} className="search-btn">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="search-results">
        {results.artists.length > 0 && (
          <section className="results-section">
            <h2 className="section-title">Artists</h2>
            <div className="artists-grid">
              {results.artists.map((artist, index) => {
                let genres: string[] = [];
                if (artist.tags?.tag) {
                  if (Array.isArray(artist.tags.tag)) {
                    genres = artist.tags.tag.slice(0, 3).map((t: Tag) => t.name);
                  } else {
                    genres = [artist.tags.tag.name];
                  }
                }

                return (
                  <ArtistCard
                    key={artist.mbid || `artist-${index}`}
                    name={artist.name}
                    image={artist.image?.[2]?.["#text"]}
                    genres={genres}
                  />
                );
              })}
            </div>
          </section>
        )}

        {results.albums.length > 0 && (
          <section className="results-section">
            <h2 className="section-title">Albums</h2>
            <div className="albums-grid">
              {results.albums.map((album, index) => (
                <div key={album.mbid || `album-${index}`} className="album-card">
                  <img 
                    src={album.image?.[2]?.["#text"] || '/img/placeholder-album.png'} 
                    alt={album.name}
                    className="album-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/img/placeholder-album.png';
                    }}
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
            <h2 className="section-title">Tracks</h2>
            <div className="tracks-list">
              {results.tracks.map((track, index) => (
                <TrackCard
                  key={track.mbid || `track-${index}`}
                  title={track.name}
                  artist={typeof track.artist === 'string' ? track.artist : track.artist?.name}
                  cover={track.image?.[2]?.["#text"]}
                  duration={track.duration ? parseInt(track.duration) : undefined}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {hasSearched && 
       !loading && 
       !results.artists.length && 
       !results.albums.length && 
       !results.tracks.length && 
       !error && (
        <div className="no-results">
          <p>No results found for "{searchQuery}"</p>
          <p>Try searching with different keywords.</p>
        </div>
      )}

      {loading && (
        <div className="loading-message">
          <p>Searching for "{searchQuery}"...</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;