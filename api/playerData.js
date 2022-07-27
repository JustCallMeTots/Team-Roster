import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

//GET PLAYERS
const getPlayers = (uid) => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
      .then((response) => {
        if (response.data) {
          resolve(Object.values(response.data));
        } else {
          resolve([]);
        }
      })
      .catch((error) => reject(error));
  });
  
  // CREATE PLAYERS
  const createPlayers = (playerObj) => new Promise((resolve, reject) => {
    axios.post(`${dbUrl}/players.json`, playerObj)
      .then((response) => {
        const payload = { firebaseKey: response.data.name };
        axios.patch(`${dbUrl}/players/${response.data.name}.json`, payload)
          .then(() => {
            getPlayers(playerObj.uid).then(resolve);
          });
      }).catch(reject);
  });

  // DELETE PLAYERS
const deletePlayers = (firebaseKey, uid) => new Promise((resolve, reject) => {
    axios.delete(`${dbUrl}/players/${firebaseKey}.json`)
      .then(() => {
        getPlayers(uid).then((playersArray) => resolve(playersArray));
      })
      .catch((error) => reject(error));
  });
  
  // UPDATE PLAYERS
  const updatePlayers = (playerObj) => new Promise((resolve, reject) => {
    axios.patch(`${dbUrl}/players/${playerObj.firebaseKey}.json`, playerObj)
      .then(resolve)
      .catch(reject);
  });

  const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}/players/${firebaseKey}.json`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

  export {
    getPlayers,
    deletePlayers,
    createPlayers,
    updatePlayers,
    getSinglePlayer
  };
