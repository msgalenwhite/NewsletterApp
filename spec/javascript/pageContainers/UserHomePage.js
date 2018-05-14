import UserHomePage from '../../../app/javascript/pageContainers/UserHomePage'
import NewsletterList from '../../../app/javascript/lists/NewsletterList'
import HeaderBar from  '../../../app/javascript/headerComponents/HeaderBar'

describe ('UserHomePage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<UserHomePage />)
  })

  it ('initializes with the correct state', () => {
    expect(wrapper.state()).toEqual({ flashMessage: null })
  })

  describe('rendered components', () => {
    it('contains a header', () => {
      expect(wrapper.find(HeaderBar)).toBePresent()
    })
    it ('has a list of newsletters', () => {
      expect(wrapper.find(NewsletterList)).toBePresent()
    })
  })
})
