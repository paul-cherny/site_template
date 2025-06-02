import React from "react";

interface IProps {
  title?: string;   
  artist?: string;
  cover?: string;
  duration?: number;
  skeleton?: boolean;
}

const TrackCard: React.FC<IProps> = ({ 
  title,
  artist,
  cover,
  duration,
  skeleton 
}) => {
  if (skeleton) {
    return (
      <div className="track-item skeleton">
        <div className="track-cover-loader"></div>
        <div className="track-info-loader"></div>
      </div>
    );
  }

  if (!title || !artist) {
    return null;
  }

  return (
    <div className="track-item">
      <img 
        src={cover || '/img/placeholder-track.png'} 
        alt={title} 
        className="track-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/img/placeholder-track.png';
        }}
      />
      <div className="track-info">
        <h3>{title}</h3>
        <p>{artist}</p>
        {duration && duration > 0 && (
          <span className="duration">
            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
          </span>
        )}
      </div>
    </div>
  );
};

export default TrackCard;