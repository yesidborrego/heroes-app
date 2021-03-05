import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Probar el authReducer', () => {
  test('Debe retornar el estado por defecto', () => {
    const state = authReducer({logged: false}, {});
    expect(state.logged).toBe(false);
  })

  test('Debe autenticar y colocar el "name" del usuario', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Isabella Borrego'
      }
    }
    const { name, logged} = authReducer({logged: false}, action);
    expect(name).toEqual(action.payload.name);
    expect(logged).toBe(true);
  })

  test('Debe borrar el "name" del usuario y el "logged" en false', () => {
    const { name, logged} = authReducer({logged: true, name: 'Isabella Borrego'}, {type: types.logout});
    expect(name).toBe(undefined);
    expect(logged).toBe(false);
  })

});
