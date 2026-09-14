export type CvExperience = {
  empresa: string;
  cargo: string;
  periodo: string;
  descripcion: string;
};

export type CvEducation = {
  institucion: string;
  titulo: string;
  periodo: string;
};

export type CvData = {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  areaInteres: string;
  cargoObjetivo: string;
  experiencia: CvExperience[];
  estudios: CvEducation[];
  habilidades: string;
};

export const emptyExperience = (): CvExperience => ({
  empresa: "",
  cargo: "",
  periodo: "",
  descripcion: "",
});

export const emptyEducation = (): CvEducation => ({
  institucion: "",
  titulo: "",
  periodo: "",
});

export const initialCvData = (): CvData => ({
  nombre: "",
  apellido: "",
  telefono: "",
  email: "",
  areaInteres: "",
  cargoObjetivo: "",
  experiencia: [emptyExperience()],
  estudios: [emptyEducation()],
  habilidades: "",
});
