import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';


describe('Probar el componente <LoginScreen/>', () => {
  const historyMock = {
    replace: jest.fn()
  };

  const contextValue = {
    dispatch: jest.fn(),
  }

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  )

  test('Debe mostrar correctamente el componente', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('Debe realizar el dispatch y la navegación', () => {
    const handleClickLogin = wrapper.find('button').prop('onClick');
    handleClickLogin(); // Se ejecuta la función del botón
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: 'Isabella Borrego'
      }
    });
    expect(historyMock.replace).toHaveBeenCalledWith('/');

    localStorage.setItem('lastPatch', '/dc');
    handleClickLogin();
    expect(historyMock.replace).toHaveBeenCalledWith('/dc');

  })

})
