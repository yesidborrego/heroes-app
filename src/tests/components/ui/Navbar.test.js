import { mount } from "enzyme"
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import Navbar from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

describe('Probar el componente <Navbar/>', () => {
  const historyMock = {
    push: jest.fn(),
    location: {},
    replace: jest.fn(),
    listen: jest.fn(),
    createHref: jest.fn()
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      name: 'Isabella Borrego',
      logged: true
    }
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar/>
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe(contextValue.user.name);
  });

  test('Debe ejecutar la función "handleLogout" y usar el "history"', () => {
    // wrapper.find('button').prop('onClick')(); // opción 1
    wrapper.find('button').simulate('click'); // opción 2
    expect(contextValue.dispatch).toHaveBeenLastCalledWith({
      type: types.logout
    });
    expect(historyMock.replace).toHaveBeenCalledWith('/login');
  })

})
