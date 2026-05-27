// src/hooks/useCreateUser.ts
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
  });

  // Generamos una contraseña temporal segura
  const [password] = useState(() => Math.random().toString(36).slice(-10) + "A1!");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!formData.nombre || !formData.apellidos || !formData.email) {
      return setError("Por favor, rellena Nombre, Apellidos y Email.");
    }

    setLoading(true);

    try {
      // Usamos el cliente nativo de Supabase en lugar de la Edge Function
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: password,
        options: {
          data: {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            telefono: formData.telefono,
            rol: "cliente" // Guardamos el rol de forma segura en los metadatos
          }
        }
      });

      if (signUpError) throw signUpError;

      // Si el correo ya existía, a veces Supabase devuelve data.user vacío o con un identy_id nulo por seguridad
      if (data.user?.identities?.length === 0) {
        throw new Error("Ya existe un usuario registrado con este correo.");
      }

      setExito(`Cliente creado con éxito. Se ha enviado un correo a ${formData.email}.`);
      setFormData({ nombre: "", apellidos: "", email: "", telefono: "" });

    } catch (err: any) {
      // Traducción de errores comunes
      let msg = err.message;
      if (msg.includes("already registered") || msg.includes("already exists")) {
        msg = "Ya existe un usuario registrado con este correo.";
      }
      setError(msg || "Error al intentar crear el cliente.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, password, handleSubmit, loading, error, exito };
};