import React from "react";

interface IProps {
  skeleton?: boolean;
  name?: string;
  image?: string;
  genres?: string[];
}

const ArtistCard: React.FC<IProps> = ({ skeleton, name, image, genres }) => {
  if (skeleton) {
    return (
      <div className="artist-card skeleton">
        <div className="avatar-loader" />
        <div className="text-loader" />
        <div className="text-loader short" />
      </div>
    );
  }

  if (!name) {
    return null;
  }

  return (
    <div className="artist-card">
      <img 
        src={image || '/img/load.png'} 
        alt={name} 
        className="artist-avatar"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/img/load.png';
        }}
      />
      <h3>{name}</h3>
      <div className="artist-genres">
        {genres && genres.length > 0 
          ? genres.join(', ') 
          : 'No genres info'
        }
      </div>
    </div>
  );
};

export default ArtistCard;