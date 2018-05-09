import fetchMock from 'fetch-mock'

import UserHomePage from '../../../app/javascript/containers/UserHomePage'
import NewsletterList from '../../../app/javascript/components/NewsletterList'

describe ('UserHomePage', () => {
  let wrapper;
  let fetchedData;

  beforeEach(() => {
    fetchedData = [
      {
        "description": "desc",
        "thumb_photo": {
          "url": "https://newsletter-app-development.s3.amazonaws.com/uploads/newsletter/thumb_photo/1/blue_flowers.jpg"
        },
        "title": "New",
        "founder_name": "test user"
      },
      {
        "description": "desc2",
        "thumb_photo": {
          "url": "https://newsletter-app-development.s3.amazonaws.com/uploads/newsletter/thumb_photo/1/blue_flowers.jpg"
        },
        "title": "Another",
        "founder_name": "not the test user"
      },
    ]

    fetchMock.get('/api/v1/newsletters.json', {
      status: 200,
      body: fetchedData
    });
    wrapper = mount(<UserHomePage />)
  })

  afterEach(fetchMock.restore)

  describe('fetch statement', () => {
    it ('initializes with the correct state', () => {
      expect(wrapper.state()).toEqual({
        foundedNewsletters: [],
        userInfo: {},
        newsletterNeedingEntry: null,
        selectedNewsletter: null,
        flashMessage: null
      })
    })

    it ('changes state to reflect the content of an api call', (done) => {
      setTimeout(() => {
        expect(wrapper.state()).toEqual({
          foundedNewsletters: fetchedData,
          userInfo: fetchedData[0]["founder"],
          newsletterNeedingEntry: null,
          selectedNewsletter: null,
          flashMessage: null
        })
        done();
      }, 0)
    })

    it ('passes the correct props to NewsletterList', () => {
      expect(wrapper.find(NewsletterList)).toHaveProp(
        'newsletters',
        wrapper.state('foundedNewsletters')
      )
    })
  })

  describe('rendered components', () => {
    it('contains a header', () => {
      expect(wrapper.text()).toContain('Newsletter Home Page')
    })
    it('has a "link" to create a Newsletter', () => {
      expect(wrapper.text()).toContain('Create a Newsletter')
      expect(wrapper.find('a').text()).toContain('Create a Newsletter')
    })
    it ('has a list of newsletters', () => {
      expect(wrapper.find(NewsletterList)).toBePresent()
    })
  })
})
