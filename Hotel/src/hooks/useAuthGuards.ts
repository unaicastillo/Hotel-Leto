// src/hooks/useAuthGuards.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export const useRequireGuest = () => {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) navigate("/");
    });
  }, [navigate]);
};

export const useRequireAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) navigate("/login");
    });
  }, [navigate]);
};




export const useRequireAdmin = () => {
  const navigate = useNavigate();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

  useEffect(() => {
    const verificarAdmin = async () => {
      setIsCheckingAdmin(true);
      
      // 1. Miramos si hay alguien logueado
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/"); // Si no hay usuario, a la calle
        return;
      }

      // 2. Buscamos su rol exacto en tu tabla profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      // 3. Comprobamos si el rol es 'admin'
      if (!profile || profile.role !== "admin") {
        navigate("/"); // Si es 'usuario' normal, a la calle
      } else {
        setIsCheckingAdmin(false); 
      }
    };

    verificarAdmin();
  }, [navigate]);

  return { isCheckingAdmin };
};