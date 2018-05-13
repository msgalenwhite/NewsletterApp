import { Route } from 'react-router'

import App from '../../app/javascript/packs/App'
import UserHomePage from '../../app/javascript/pageContainers/UserHomePage'

it('renders correct routes', () => {
  const wrapper = shallow(<App />);
  const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
    const routeProps = route.props();
    pathMap[routeProps.path] = routeProps.component;
    return pathMap;
  }, {});

  expect(pathMap['/']).toBe(UserHomePage);
});
