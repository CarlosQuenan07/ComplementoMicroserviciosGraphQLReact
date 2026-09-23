import { gql } from "@apollo/client";

export const OBTENER_USUARIOS = gql`
  query ObtenerUsuarios {
    users {
      id
      name
      email
    }
  }
`;

export const CREAR_USUARIO = gql`
  mutation CrearUsuario($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const ACTUALIZAR_USUARIO = gql`
  mutation ActualizarUsuario($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

export const ELIMINAR_USUARIO = gql`
  mutation EliminarUsuario($id: ID!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`;
