import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { OBTENER_USUARIOS, ELIMINAR_USUARIO } from "../graphql/operaciones";

export default function ListaUsuarios({ alEditar }) {
  const [mensaje, setMensaje] = useState("");

  const { loading, error, data } = useQuery(OBTENER_USUARIOS);

  const [eliminarUsuario] = useMutation(ELIMINAR_USUARIO, {
    refetchQueries: [{ query: OBTENER_USUARIOS }],
  });

  if (loading) return <p>Cargando usuarios...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const eliminar = async (id) => {
    if (!confirm("¿Desea eliminar este usuario?")) return;

    try {
      const { data } = await eliminarUsuario({
        variables: {
          id: Number(id),
        },
      });

      setMensaje(data.deleteUser.message);
    } catch (err) {
      setMensaje(`Error: ${err.message}`);
    }
  };

  return (
    <section>
      {mensaje && <p>{mensaje}</p>}

      {data.users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.users.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>
                  <button onClick={() => alEditar(usuario)}>Editar</button>

                  <button onClick={() => eliminar(usuario.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
