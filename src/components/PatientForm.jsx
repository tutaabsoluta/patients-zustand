import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Error } from "../components";
import { usePatientStore } from "../store/store";

export const PatientForm = () => {
  const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();

  const addPatient = usePatientStore((state) => state.addPatient);
  const activeId = usePatientStore((state) => state.activeId);
  const patients = usePatientStore((state) => state.patients);
  const updatePatient = usePatientStore((state) => state.updatePatient);

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.find((patient) => patient.id === activeId);
      const { name, caretaker, email, date, symptoms } = activePatient;
      setValue("name", name);
      setValue("caretaker", caretaker);
      setValue("email", email);
      setValue("date", date);
      setValue("symptoms", symptoms);
    }
  }, [activeId]);

  const registerPatient = (data) => {
    if (activeId) {
      updatePatient(data);
      toast.success("Paciente Actualizado Correctamente");
    } else {
      addPatient(data);
      toast.success("Paciente Registrado Correctamente");
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
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className={`w-full p-3 border ${errors.name ? 'border-red-600' : 'border-gray-100'} peer`}
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del Paciente es obligatorio",
              maxLength: 8,
            })}
          />
          <Error hasError={!!errors.name}>{errors.name?.message}</Error>
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className={`w-full p-3 border ${errors.caretaker ? 'border-red-600' : 'border-gray-100'} peer`}
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El nombre del propietario es obligatorio",
            })}
          />
          <Error hasError={!!errors.caretaker}>{errors.caretaker?.message}</Error>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className={`w-full p-3 border ${errors.email ? 'border-red-600' : 'border-gray-100'} peer`}
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
          <Error hasError={!!errors.email}>{errors.email?.message}</Error>
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className={`w-full p-3 border ${errors.date ? 'border-red-600' : 'border-gray-100'} peer`}
            type="date"
            {...register("date", {
              required: "Elige una fecha",
            })}
          />
          <Error hasError={!!errors.date}>{errors.date?.message}</Error>
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className={`w-full p-3 border ${errors.symptoms ? 'border-red-600' : 'border-gray-100'} peer`}
            placeholder="Síntomas del paciente"
            {...register("symptoms", {
              required: "Describe los síntomas del Paciente",
            })}
          ></textarea>
          <Error hasError={!!errors.symptoms}>{errors.symptoms?.message}</Error>
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={!activeId ? "Guardar Cambios" : "Actualizar Cambios"}
        />
      </form>
    </div>
  );
};
