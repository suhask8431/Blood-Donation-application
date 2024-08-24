import axios from 'axios';
const apiPort = process.env.PORT || 8080;
console.log("apiPort")
console.log(apiPort)

const api = axios.create({
    baseURL: `http://blood-donation-application-qnmvieqrx-suhas-s-kubasads-projects.vercel.app`,
});



export const SignUp = payload => api.post('/sign', payload);
export const guestSignUp = payload => api.post('/guestsign', payload);
export const LoginID = payload => api.post('/login', payload);
export const guestLogin = payload => api.post('/guestlogin', payload);
export const Donate = payload => api.post('/donate', payload);
export const putRank = payload => api.post('/putRank', payload);
export const getRank = payload => api.get('/getRanks', payload);
export const putDonate = payload => api.post('/putDonate', payload);
export const getDonate = payload => api.get('/getDonate', payload);
export const deleteDonate = payload => api.post('/deleteDonate', payload);

export const updateRanks = payload => api.put('/updateRanks', payload);

export const getmsgs = payload => api.get('/getmsgs', payload);
export const putmsgs = payload => api.post('/putmsgs', payload);


export const userId = payload =>api.post('/userId', payload);
export const createRoom = payload => api.post('/rooms', payload);
export const createBRooms = payload=> api.post('BRooms',payload);
export const getRooms = payload => api.post('/getRooms',payload);
export const joinRoom =payload=> api.post('/joinRoom',payload);


const apis = {
    SignUp,
    guestSignUp,
    guestLogin,
    LoginID,
    Donate,
    putRank,
    getRank,
    deleteDonate,
    getDonate,
    putDonate,
    getmsgs,putmsgs,
    updateRanks
};

export const userIdApi ={
    userId,
};
export const SignUpApi = {
    SignUp,
    LoginID,
};
export const createRoomApi = {
    createRoom,
    createBRooms,
};
  
export const getRoomApi = {
    joinRoom,
    getRooms,
};
export default apis;
