import React from "react";

interface Props {
  title: string;   
  artist: string;
  cover?: string;
  duration?: number;
  skeleton?: boolean;
}

const TrackCard: React.FC<Props> = ({ 
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

  return (
    <div className="track-item">
      <img 
        src={cover || '/placeholder-track.png'} 
        alt={title} 
        className="track-cover"
      />
      <div className="track-info">
        <h3>{title}</h3>
        <p>{artist}</p>
        {duration && (
          <span className="duration">
Math.floor(duration / 60):{(duration % 60).toString().padStart(2, '0')}
          </span>
        )}
      </div>
    </div>
  );
};

export default TrackCard;