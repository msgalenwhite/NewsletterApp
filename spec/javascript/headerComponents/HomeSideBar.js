import HomeSideBar from '../../../app/javascript/headerComponents/HomeSideBar'

describe('HomeSideBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomeSideBar />)
  })

  it("asks what's next", () => {
    expect(wrapper.find('h5').text()).toEqual("What's next?")
  })
  it("has a link to the newsletters page", () => {
    expect(wrapper.find('a').props().href).toEqual('/newsletters/new')
    expect(wrapper.find('a').find('button').text()).toEqual('Start a Newsletter')
  })
})
