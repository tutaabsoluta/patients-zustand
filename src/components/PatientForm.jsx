import { useForm } from "react-hook-form";
import { Error } from "../components";
import { usePatientStore } from "../store/store";
import { useEffect } from "react";

export const PatientForm = () => {

  // React Hook Form
  const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();

  // Store
  const addPatient = usePatientStore( state => state.addPatient );
  const activeId = usePatientStore( state => state.activeId );
  const patients = usePatientStore( state => state.patients );
  const updatePatient = usePatientStore( state => state.updatePatient );


  useEffect(() => {
    if( activeId ) {
      const activePatient = patients.filter( patient => patient.id === activeId )[0]

      const { name, caretaker, email, date, symptoms } = activePatient
      setValue('name',name)
      setValue('caretaker',caretaker)
      setValue('email',email)
      setValue('date',date)
      setValue('symptoms',symptoms)
    }
  }, [ activeId ])

  // Form Submit function
  const registerPatient = ( data ) => {

    if ( activeId ) {
      updatePatient( data )
    } else {
      addPatient( data )
    }
    reset();
  };

  

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={ handleSubmit( registerPatient ) }
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del Paciente es obligatorio",
              // minLength: {
              //   value: 8,
              //   message: 'El nombre debe tener minimo dos caracteres'
              // },
              maxLength: 8,
            })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
          {/* { errors.minLength && <Error>{ errors.minLength.message }</Error> } */}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El nombre del propietario es obligatorio",
            })}
          />
          {errors.caretaker && <Error>{ errors.caretaker.message }</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email No Válido",
              },
            })}

          />
            {errors.email && <Error>{errors.email.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            { ...register( 'date', {
              required: 'Elige una fecha'
            } ) }
          />
          { errors.date && <Error>{ errors.date.message }</Error> }
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            { ...register( 'symptoms', {
              required:'Describe los sintomas del Paciente'
            } ) }
          ></textarea>
          { errors.symptoms && <Error>{ errors.symptoms.message }</Error> }
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={ !activeId ? 'Guardar Cambios' : 'Actualizar Cambios' }
        />
      </form>
    </div>
  );
};

// Aqui no se genera el id, la funcion toma la data pero la lleva al store, ahi es que se genera el id

// Hay que revisar cuando activeId tenga algo. useEffect

// setValue permite regresar un valor o setearlo por default al form