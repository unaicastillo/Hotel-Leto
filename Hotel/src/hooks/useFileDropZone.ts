// src/hooks/useFileDropzone.ts
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const useFileDropzone = () => {
  const [nombreArchivo, setNombreArchivo] = useState<string | null>(null);

  // Memorizamos la función para evitar re-renderizados innecesarios
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setNombreArchivo(acceptedFiles[0].name);
    }
  }, []);

  // Configuramos Dropzone con las validaciones que necesitamos
  const dropzone = useDropzone({
    onDrop,
    maxFiles: 1, // Límite de 1 archivo por envío
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    }
  });

  // Devolvemos todo lo que la vista necesita para pintarse y funcionar
  return {
    ...dropzone,      // Exporta getRootProps, getInputProps, isDragActive, etc.
    nombreArchivo,    // Exporta el nombre del archivo guardado en el estado
  };
};

export default useFileDropzone;