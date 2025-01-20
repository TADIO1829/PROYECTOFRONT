import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";

export const Formulario = ({ nino }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: nino?.nombre ?? "",
    nivel: nino?.nivel ?? "",
    tutorNombre: nino?.tutor?.nombre ?? "",
    tutorCelular: nino?.tutor?.celular ?? "",
    tutorEmail: nino?.tutor?.emailPadres ?? "",
    fechaIngreso: new Date(nino?.fechaIngreso).toLocaleDateString("en-CA", { timeZone: "UTC" }) ?? "",
    estado: nino?.estado ?? true,
    observaciones: nino?.observaciones ?? "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (nino?._id) {
        // Actualizar niño existente
        const url = `${import.meta.env.VITE_BACKEND_URL}/nino/actualizar/${nino?._id}`;
        await axios.put(url, form, options);
        navigate("/dashboard/listar");
      } else {
        // Registrar nuevo niño
        form.id = auth._id;
        const url = `${import.meta.env.VITE_BACKEND_URL}/nino/registro`;
        await axios.post(url, form, options);
        navigate("/dashboard/listar");
      }
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

      <div>
        <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
          Nombre del niño:
        </label>
        <input
          id="nombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Nombre del niño"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="nivel" className="text-gray-700 uppercase font-bold text-sm">
          Nivel educativo:
        </label>
        <input
          id="nivel"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Nivel educativo (e.g., Inicial 1)"
          name="nivel"
          value={form.nivel}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="tutorNombre" className="text-gray-700 uppercase font-bold text-sm">
          Nombre del tutor:
        </label>
        <input
          id="tutorNombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Nombre del tutor"
          name="tutorNombre"
          value={form.tutorNombre}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="tutorCelular" className="text-gray-700 uppercase font-bold text-sm">
          Celular del tutor:
        </label>
        <input
          id="tutorCelular"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Celular del tutor"
          name="tutorCelular"
          value={form.tutorCelular}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="tutorEmail" className="text-gray-700 uppercase font-bold text-sm">
          Email del tutor:
        </label>
        <input
          id="tutorEmail"
          type="email"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Email del tutor"
          name="tutorEmail"
          value={form.tutorEmail}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="fechaIngreso" className="text-gray-700 uppercase font-bold text-sm">
          Fecha de ingreso:
        </label>
        <input
          id="fechaIngreso"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          name="fechaIngreso"
          value={form.fechaIngreso}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="observaciones" className="text-gray-700 uppercase font-bold text-sm">
          Observaciones:
        </label>
        <textarea
          id="observaciones"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Observaciones"
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
        ></textarea>
      </div>

      <input
        type="submit"
        className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all"
        value={nino?._id ? "Actualizar Niño" : "Registrar Niño"}
      />
    </form>
  );
};
