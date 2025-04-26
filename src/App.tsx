import { Home } from './components/home/Home';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { PersonasPage } from './components/personas/PersonasPage';
import { AutosPage } from './components/autos/AutosPage';
import { PersonaDetailsPage } from './components/personas/PersonaDetailsPage';
import { AutoDetailsPage } from './components/autos/AutoDetailsPage';
import { PersonaEditPage } from './components/personas/PersonaEditPage';
import { AutoEditPage } from './components/autos/AutoEditPage';
import { NewEntityButton } from './components/buttons';
import { NewEntityForm } from './components/formulario/NewEntityForm';
import { PersonaNewForm } from './components/personas/PersonaNewForm';
import { PersonaForm } from './components/personas/PersonaForm';
import { AutoForm } from './components/autos/AutoForm';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/autos" element={<AutosPage />} />
                <Route path="/autos/:id" element={<AutoDetailsPage />} />
                <Route path="/autos/edit/:id" element={<AutoForm isEdit={true} />} />
                <Route path="/autos/new" element={<AutoForm isEdit={false} />} />
                <Route path="/personas" element={<PersonasPage />} />
                <Route path="/personas/:id" element={<PersonaDetailsPage />} />
                <Route path="/personas/edit/:id" element={<PersonaForm isEdit={true} />} />
                <Route path="/personas/new" element={<PersonaForm isEdit={false} />} />
            </Routes>
        </>
    );
};

export default App;
