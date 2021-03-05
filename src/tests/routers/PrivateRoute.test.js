import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe('Probar el componente <PrivateRoute />', () => {
  const rest = {
    location: {
      pathname: '/marvel',
      search: ''
    }
  };

  Storage.prototype.setItem = jest.fn();

  test('Debe mostrar el componente si está autenticado y guardar en el localStorage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isLogged={true}
          component={() => <span>Componente cargado!</span>}
          {...rest}
        />
      </MemoryRouter>
    );
    expect(wrapper.find('span').exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPatch', '/marvel');
  })

  test('Debe bloquear el componente si no está autenticado', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isLogged={false}
          component={() => <span>Componente cargado!</span>}
          {...rest}
        />
      </MemoryRouter>
    );
    expect(wrapper.find('span').exists()).toBe(false);
  })

});
