import NewsletterDisplayTile from '../../../app/javascript/components/NewsletterDisplayTile'

describe ('NewsletterDisplayTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <NewsletterDisplayTile />
    )
  })

  xit ('renders a div containing a paragraph and an image', () => {
    expect(wrapper.find("p")).toBePresent()
    expect(wrapper.find("img")).toBePresent()
  })
})
