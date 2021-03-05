import '@testing-library/jest-dom';
import { mount } from "enzyme";
import { MemoryRouter, Route } from 'react-router-dom';
import HeroScreen from '../../../components/heroes/HeroScreen';


describe('Probar el componente <HeroScreen/>', () => {
  const historyMock = {
    push: jest.fn(),
    length: 10,
    goBack: jest.fn()
  };

  test('Debe mostrarse el componente "redirect" si no hay argumentos en el URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );
    expect(wrapper.find('Redirect').exists()).toBe(true);
  })

  test('Debe mostrar un heroe si el parámetro y el hero existen', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <Route path="/hero/:heroId" component={HeroScreen} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.row').exists()).toBe(true);
  })

  test('Debe regresar al inicio al hacer "click" (push)', () => {
    const historyMock = {
      push: jest.fn(),
      length: 1,
      goBack: jest.fn()
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <Route
          path="/hero/:heroId"
          component={() => <HeroScreen history={historyMock} />} />
      </MemoryRouter>
    );
    wrapper.find('button').simulate('click');
    expect(historyMock.push).toHaveBeenLastCalledWith('/');
    expect(historyMock.goBack).not.toHaveBeenCalled();
  })

  test('Debe regresar a la pantalla anterior al hacer "click" (goBack)', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <Route
          path="/hero/:heroId"
          component={() => <HeroScreen history={historyMock} />} />
      </MemoryRouter>
    );
    wrapper.find('button').simulate('click');
    expect(historyMock.push).not.toHaveBeenCalled();
    expect(historyMock.goBack).toHaveBeenCalled();
  })

  test('Debe llamar el "redirect" si el hero no existe', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-iron1']}>
        <Route
          path="/hero/:heroId"
          component={() => <HeroScreen history={historyMock} />} />
      </MemoryRouter>
    );
    expect(wrapper.text()).toBe('');
  })
});
