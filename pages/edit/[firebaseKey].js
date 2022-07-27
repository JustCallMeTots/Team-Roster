import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../api/playerData';
import PlayerForms from '../../components/forms/PlayerForms';

export default function EditPlayer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<PlayerForms obj={editItem} />);
}
