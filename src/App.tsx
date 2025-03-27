import react from 'react';
import axios from 'axios';

import './App.css';

const serverUrl = 'http://localhost:3000/';

const App: react.FC = () => {
    const [message, setMessage] = react.useState<string | undefined>();

    react.useEffect(() => {
        async function getHelloWorld() {
            const response = await axios.get<string>(serverUrl);
            setMessage(response.data);
        }
        getHelloWorld();
    }, []);
    return <>{message === undefined ? <h2>Loading...</h2> : <h2>{message}</h2>}</>;
};

export default App;
