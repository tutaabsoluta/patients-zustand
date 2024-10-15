import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { PatientForm, PatientsList } from "./components";


function App() {
  return (
    <>
      <div className="container mx-auto mt-20">
        <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
          Seguimiento de Pacientes {""}
          <span className="text-indigo-700">Veterinaria</span>
        </h1>

        <div className="mt-12 md:flex">
          <PatientForm />
          <PatientsList />
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;

// Primero se registra el componente de React-Toastify en el App.jsx
// Luego se llaman las funciones donde queremos disparar los eventos de toastify
// Para que se muestre en pantalla hay que definirle un estilo
