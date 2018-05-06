import App from '../../app/javascript/packs/App'
import UserHomePage from '../../app/javascript/containers/UserHomePage'
import { Route } from 'react-router'

it('renders correct routes', () => {
  const wrapper = shallow(<App />);
  const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    pathMap[routeProps.path] = routeProps.component;
    return pathMap;
  }, {});

  expect(pathMap['/']).toBe(UserHomePage);
});
