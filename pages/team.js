import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';

export default function Players() {
  const [players, setPlayers] = useState([]);

  const { user } = useAuth();

  const getAllPlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getAllPlayers();
    document.title = 'Team Page';
  }, []);
  return (
    <div className="text-center my-4">
      <Link href="/new" passHref>
        <Button>Add A Player</Button>
      </Link>
      <div>
        {players.map((player) => (
          <PlayerCard playerObj={player} key={player.firebaseKey} onUpdate={getAllPlayers} />
        ))}
      </div>
    </div>
  );
}
