import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Agregar un id al paciente
const createPatient = ( patient ) => {
  return {
    ...patient, id: uuidv4()
  }
}

export const usePatientStore = create((set) => ({

  // state
  patients: [],

  // action addPatient
  addPatient: ( data ) => {

    const newPatient = createPatient( data )

    set( ( state ) => ({
      patients: [ ...state.patients, newPatient ]
    }) )
  },

  // action deletePatient
  deletePatient: ( id ) => {
    set( (state) => ({
      patients: state.patients.filter( patient => patient.id !== id )
    }) )
  },

  // action editPatient
  editPatient: ( id ) => {
    
  }

}));

// La funcion set la usamos para escribir en el estado. Toma un callback. El argumento es el state previo