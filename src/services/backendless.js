import Backendless from 'backendless';

const APP_ID = process.env.REACT_APP_BACKENDLESS_APP_ID;
const API_KEY = process.env.REACT_APP_BACKENDLESS_API_KEY;

Backendless.initApp(APP_ID, API_KEY);

export default Backendless;
