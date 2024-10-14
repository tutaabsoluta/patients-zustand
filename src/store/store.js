import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';

// Agregar un id al paciente para poder agregarlo al array
const createPatient = (patient) => ({
  ...patient, id: uuidv4()
});

export const usePatientStore = create()(devtools((set) => ({

  // Estado inicial
  patients: [],
  activeId: null,

  // Acción para agregar un paciente
  addPatient: (data) => {
    const newPatient = createPatient(data);
    set((state) => ({
      patients: [...state.patients, newPatient]
    }));
  },

  // Acción para seleccionar un paciente para editar
  selectPatient: (id) => {
    set((state) => ({
      selectedPatient: state.patients.find((patient) => patient.id === id),
    }));
  },

  // Acción para eliminar un paciente
  deletePatient: (id) => {
    set((state) => ({
      patients: state.patients.filter((patient) => patient.id !== id),
    }));
  },

  // Acción para obtener datos de un paciente al presionar editar //*1
  getPatientById: ( id ) => {
    set(() => ({
      activeId: id
    }))
  },

  // Accion para actualizar un paciente
  updatePatient: ( data ) => {
    set((state) => ({
      patients: state.patients.map( patient => patient.id === state.activeId 
          ? { id: state.activeId, ...data } 
          : patient
      ),
      activeId: "",
    }));
  }

})));

//*1 No requiere state porque escribimos directamente en activeId, no ocupamos un valor

// Accion editar:
// Primero hay que identificar el registro por editar

// updatePatient: iteramos sobre los pacientes e identificamos el que estamos editando. Una vezx que lo estamos editando vamos a almacenar lo que hay en data, lo que se pasa del form y sino para no perder la info que teniamos retornamos los otros pacientes.

// Zustand permite modificar varios state, de modo que luego regresamos activeId a un string vacio