import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlayers } from '../api/playerData';

function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.playerName}?`)) {
      deletePlayers(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      width: '18rem', margin: '10px', backgroundColor: '#282D3A', display: 'flex', flexWrap: 'wrap',
    }}
    >
      <Card.Img variant="top" src={playerObj.playerImage} alt={playerObj.playerName} style={{ height: '400px', display: 'flex', flexWrap: 'wrap' }} />
      <Card.Body>
        <Card.Title>{playerObj.playerName}</Card.Title>
        <p className="card-text bold">{playerObj.captian && <span>🏐<br /></span> }  {playerObj.position}</p>
        <Link href={`/edit/${playerObj.firebaseKey}`} passHref>
          <Button style={{ backgroundColor: '#3D9C5D' }}>EDIT</Button>
        </Link>
        <Button style={{ backgroundColor: '#54C3EC' }} onClick={deleteThisPlayer} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    playerName: PropTypes.string,
    playerImage: PropTypes.string,
    captian: PropTypes.bool,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
