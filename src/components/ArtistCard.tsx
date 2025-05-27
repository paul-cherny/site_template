import React from "react";

interface Props {
  skeleton?: boolean;
  name?: string;
  image?: string;
  genres?: string[];
}

const ArtistCard: React.FC<Props> = ({ skeleton, name, image, genres }) => {
  if (skeleton) {
    return (
      <div className="artist-card skeleton">
        <div className="avatar-loader" />
        <div className="text-loader" />
        <div className="text-loader short" />
      </div>
    );
  }

  return (
    <div className="artist-card">
      <img 
        src={image || '/img/load.png'} 
        alt={name} 
        className="artist-avatar" 
      />
      <h3>{name}</h3>
      <div className="artist-genres">
        {genres?.join(', ') || 'No genres info'}
      </div>
    </div>
  );
};

export default ArtistCard;