import { usePatientStore } from "../store/store";
import { PatientDetail } from "./PatientDetail";

export const PatientsList = () => {
  const patients = usePatientStore((state) => state.patients);

  return (
    <>
      <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
        {
          patients.length 
          ? 
          (
            <>
              <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
              <p className="text-xl mt-5 mb-10 text-center">
                Administra tus {''}
                <span className="text-indigo-600 font-bold">Pacientes</span>
              </p>
              {
                patients.map( patient => (
                  <PatientDetail 
                    key={ patient.id } 
                    patient={ patient }
                  />
                ) )
              }
            </>
          ) 
          : 
          (
            <>
              <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
              <p className="text-xl mt-5 mb-10 text-center">
                Comienza agregando pacientes {''}
                <span className="text-indigo-600 font-bold"> y apareceran en este lugar</span>
              </p>
            </>
          )
        }
      </div>
    </>
  );
};

// overflow-y-scroll cuando se da scroll en los pacientes no se pierda el form
