"use client";

import { useState } from "react";
import { fieldClass, labelClass } from "@/lib/visual-kit/styles";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

const initialForm: FormData = {
  nombre: "",
  email: "",
  telefono: "",
  mensaje: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEnviando(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/mensajes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setEnviado(true);
      setFormData(initialForm);
    } catch {
      setEnviado(true);
      setFormData(initialForm);
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="py-6 text-center">
        <p className="font-display text-2xl text-ink">Mensaje enviado</p>
        <p className="mt-3 text-sm leading-6 text-muted">
          Gracias por escribirnos. Un especialista de Hakamo te contactará en menos de 24 horas.
        </p>
        <button type="button" onClick={() => setEnviado(false)} className="mt-6 text-sm font-semibold text-accent">
          Enviar otro mensaje →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="telefono">
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="829-000-0000"
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="email">
          Correo
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tu@correo.com"
          className={fieldClass}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="mensaje">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Cuéntanos qué necesitas..."
          className={`${fieldClass} resize-none`}
        />
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <button
        type="submit"
        disabled={enviando}
        className="inline-flex w-full items-center justify-center rounded-full bg-night px-5 py-3 text-sm font-semibold text-paper transition hover:bg-[color-mix(in_srgb,var(--night)_88%,white)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {enviando ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
