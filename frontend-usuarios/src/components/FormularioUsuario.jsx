import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  CREAR_USUARIO,
  ACTUALIZAR_USUARIO,
  OBTENER_USUARIOS,
} from "../graphql/operaciones";

const inicial = { name: "", email: "" };

export default function FormularioUsuario({ usuarioEditar, alTerminar }) {
  const [formulario, setFormulario] = useState(inicial);
  const [mensaje, setMensaje] = useState("");

  const opciones = { refetchQueries: [{ query: OBTENER_USUARIOS }] };

  const [crear, { loading: creando }] = useMutation(CREAR_USUARIO, opciones);
  const [actualizar, { loading: actualizando }] = useMutation(
    ACTUALIZAR_USUARIO,
    opciones,
  );

  const guardando = creando || actualizando;

  useEffect(() => {
    setFormulario(
      usuarioEditar
        ? { name: usuarioEditar.name, email: usuarioEditar.email }
        : inicial,
    );
    setMensaje("");
  }, [usuarioEditar]);

  const cambiar = (e) =>
    setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const guardar = async (e) => {
    e.preventDefault();

    const input = {
      name: formulario.name.trim(),
      email: formulario.email.trim(),
    };

    if (!input.name || !input.email) {
      setMensaje("Nombre y correo son obligatorios");
      return;
    }

    try {
      if (usuarioEditar) {
        await actualizar({
          variables: { id: Number(usuarioEditar.id), input },
        });
        setMensaje("Usuario actualizado correctamente");
      } else {
        await crear({ variables: { input } });
        setMensaje("Usuario registrado correctamente");
      }

      setFormulario(inicial);
      alTerminar();
    } catch (err) {
      setMensaje(`Error: ${err.message}`);
    }
  };

  const cancelar = () => {
    setFormulario(inicial);
    setMensaje("");
    alTerminar();
  };

  return (
    <form onSubmit={guardar}>
      <h2>{usuarioEditar ? "Editar usuario" : "Nuevo usuario"}</h2>

      <input
        name="name"
        placeholder="Nombre"
        value={formulario.name}
        onChange={cambiar}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Correo"
        value={formulario.email}
        onChange={cambiar}
        required
      />

      <div>
        <button type="submit" disabled={guardando}>
          {guardando
            ? "Guardando..."
            : usuarioEditar
              ? "Actualizar"
              : "Guardar"}
        </button>

        {usuarioEditar && (
          <button type="button" onClick={cancelar}>
            Cancelar
          </button>
        )}
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}
