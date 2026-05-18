// src/hooks/useAuthGuards.ts
import { useEffect } from "react";
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