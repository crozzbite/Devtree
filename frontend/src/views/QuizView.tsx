import { useState } from "react";
import api from "../config/axios"; // Importar la instancia de Axios
import { toast } from "sonner"; // Para mostrar notificaciones
import { isAxiosError } from "axios";

export default function QuizView() {
  const [answers, setAnswers] = useState({ q1: 0, q2: 0, q3: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const score = answers.q1 + answers.q2 + answers.q3;
      const { data } = await api.post("/quizt", { score }); // Enviar totalScore al backend
      toast.success(`Quiz completado con éxito. Tu puntuación es: ${data.score}`); // Mostrar la puntuación total
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center">Quiz de Casa</h1>
        <p className="text-center text-gray-600">Este quiz es obligatorio para completar tu registro.</p>

        <div>
          <p className="font-semibold">1. ¿Pregunta genérica 1?</p>
          <div className="space-y-2">
            <label className="block">
              <input type="radio" name="q1" value="1" onChange={handleChange} /> Opción 1 (1 punto)
            </label>
            <label className="block">
              <input type="radio" name="q1" value="2" onChange={handleChange} /> Opción 2 (2 puntos)
            </label>
            <label className="block">
              <input type="radio" name="q1" value="3" onChange={handleChange} /> Opción 3 (3 puntos)
            </label>
          </div>
        </div>

        <div>
          <p className="font-semibold">2. ¿Pregunta genérica 2?</p>
          <div className="space-y-2">
            <label className="block">
              <input type="radio" name="q2" value="1" onChange={handleChange} /> Opción 1 (1 punto)
            </label>
            <label className="block">
              <input type="radio" name="q2" value="2" onChange={handleChange} /> Opción 2 (2 puntos)
            </label>
            <label className="block">
              <input type="radio" name="q2" value="3" onChange={handleChange} /> Opción 3 (3 puntos)
            </label>
          </div>
        </div>

        <div>
          <p className="font-semibold">3. ¿Pregunta genérica 3?</p>
          <div className="space-y-2">
            <label className="block">
              <input type="radio" name="q3" value="1" onChange={handleChange} /> Opción 1 (1 punto)
            </label>
            <label className="block">
              <input type="radio" name="q3" value="2" onChange={handleChange} /> Opción 2 (2 puntos)
            </label>
            <label className="block">
              <input type="radio" name="q3" value="3" onChange={handleChange} /> Opción 3 (3 puntos)
            </label>
          </div>
        </div>

        <button type="submit" className="bg-cyan-400 text-white px-6 py-3 rounded-lg font-bold w-full">
          Enviar Respuestas
        </button>
      </form>
    </div>
  );
}
