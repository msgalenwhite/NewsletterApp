import UserHomePage from '../../app/javascript/containers/UserHomePage'

describe ('UserHomePage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<UserHomePage />)
  })

  // Testing State and its changes
  it ('initializes with the correct state', () => {
    expect(wrapper.state()).toEqual({
      foundedNewsletters: [],
      userInfo: {}
    })
  })

  // Testing rendered components
  it('contains a header', () => {
    expect(wrapper.text()).toContain('Newsletter Home Page')
  })
  it('has a "link" to create a Newsletter', () => {
    expect(wrapper.text()).toContain('Create a Newsletter')
    expect(wrapper.find('a').text()).toContain('Create a Newsletter')
  })
})
