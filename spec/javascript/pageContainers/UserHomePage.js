import UserHomePage from '../../../app/javascript/pageContainers/UserHomePage'
import HeaderBar from '../../../app/javascript/headerComponents/HeaderBar'
import NewsletterList from '../../../app/javascript/lists/NewsletterList'

describe ('UserHomePage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<UserHomePage />)
  })

  it ("initializes with the correct state", () => {
    expect(wrapper.state()).toEqual({
      flashMessage: null
    })
  })

  it ("renders a Header Bar", () => {
    expect(wrapper.find(HeaderBar)).toBePresent()
  })

  it ("renders a NewsletterList", () => {
    expect(wrapper.find(NewsletterList)).toBePresent()
  })
})
