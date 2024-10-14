import { usePatientStore } from "../store/store";
import { PatientDetailItem } from "./PatientDetailItem";

export const PatientDetail = ({ patient }) => {

  const deletePatient = usePatientStore((state) => state.deletePatient);
  const getPatientById = usePatientStore((state) => state.getPatientById); 


  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label={"ID"} data={patient.id} />
      <PatientDetailItem label={"Nombre"} data={patient.name} />
      <PatientDetailItem label={"Propietario"} data={patient.caretaker} />
      <PatientDetailItem label={"Email"} data={patient.email} />
      <PatientDetailItem label={"Fecha alta"} data={patient.date} />
      <PatientDetailItem label={"Sintomas"} data={patient.symptoms} />

      <div className="flex flex-col mb-4 md:mb-0 lg:flex-row justify-between mt-8 gap-3">
        <button
          className="bg-indigo-600 py-2 px-10 text-white font-bold rounded-md hover:bg-indigo-800 duration-300 uppercase"
          type="button"
          onClick={() => getPatientById( patient.id )} 
        >
          Editar
        </button>

        <button
          className="bg-red-600 py-2 px-10 text-white font-bold rounded-md hover:bg-red-800 duration-300 uppercase"
          type="button"
          onClick={() => deletePatient( patient.id )}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
