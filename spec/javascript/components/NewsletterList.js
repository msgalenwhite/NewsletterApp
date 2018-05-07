import NewsletterList from '../../../app/javascript/components/NewsletterList'
import NewsletterDisplayTile from '../../../app/javascript/components/NewsletterDisplayTile'

describe ('NewsletterList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<NewsletterList />)
  })

  it ("contains a list of Newsletters", () => {
    expect(wrapper.find(NewsletterDisplayTile)).toBePresent()
  })
})
