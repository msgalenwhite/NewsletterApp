import HeaderBar from '../../../app/javascript/headerComponents/HeaderBar'
import FlashMessage from '../../../app/javascript/headerComponents/FlashMessage'

describe('HeaderBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HeaderBar
        title='Welcome to the Family Newsletter!'
        flashMessage='Test Message'
      />
    )
  })

  it('includes the page title', () => {
    expect(wrapper.find('h1').text()).toEqual(wrapper.props().title)
  })

  describe('conditionally renders a FlashMessage based on flashMessage prop', () => {
    it('does not render when null', () => {
      wrapper.setProps({ flashMessage: false })
      expect(wrapper.find(FlashMessage).exists()).toEqual(false)
    })
    it('does not render when null', () => {
      wrapper.setProps({ flashMessage: 'Test Message' })
      expect(wrapper.find(FlashMessage).exists()).toEqual(true)
    })
  })
})
