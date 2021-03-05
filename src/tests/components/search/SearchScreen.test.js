import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import SearchScreen from '../../../components/search/SearchScreen';

describe('Probar el componente <SearchScreen/>', () => {
  test('Debe mostrarse correctamente el componente', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search a Hero');
  })

  test('Debe cargar los datos de "Batman" y mostarlo en el input', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper.find('HeroCard').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  })

  test('Debe cargar el "alert-danger" si no se encuentra el hero', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman1']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find('.alert-danger').exists()).toBe(true);
    expect(wrapper.find('.alert-danger').text()).toBe('Heroes not found');
    expect(wrapper.find('HeroCard').exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  })

  test('Debe llamar el "push" del history', () => {
    const historyMock = {
      push: jest.fn()
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route
          path="/search"
          component={() => <SearchScreen history={historyMock} />} />
      </MemoryRouter>
    );
    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchHero',
        value: 'batman'
      }
    });
    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    });
    expect(historyMock.push).toHaveBeenCalledWith('?q=batman');
  })

})
