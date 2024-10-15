import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';

// Agregar un id al paciente para poder agregarlo al array
const createPatient = (patient) => ({
  ...patient, id: uuidv4()
});

export const usePatientStore = create()(
  devtools(
    persist(
    (set) => ({

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

}),{
  name:'patient-storage',
  storage: createJSONStorage(() => localStorage) // LocalStorage es el default, es para ver
})));

//*1 No requiere state porque escribimos directamente en activeId, no ocupamos un valor

// Accion editar:
// Primero hay que identificar el registro por editar

// Zustand permite modificar varios state, de modo que luego regresamos activeId a un string vacio

// updatePatient: recorre la lista de pacientes y actualiza el paciente cuyo id coincide con activeId. Sustituye sus datos por los nuevos pasados en data y al final limpia activeId. el ...data esparce los datos nuevos que se pasaron en la llamada de la funcion