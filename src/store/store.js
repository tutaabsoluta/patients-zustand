import { create } from 'zustand';

export const usePatientStore = create((set) => ({

  // state
  patients: [],

  // action
  addPatient: ( data ) => {
    console.log(data)
  }

}));
