<<<<<<< HEAD:spec/javascript/lists/NewsletterList.js
import NewsletterList from '../../../app/javascript/lists/NewsletterList'
import NewsletterDisplayTile from '../../../app/javascript/newsletterTileComponents/NewsletterDisplayTile'
import fetchMock from 'fetch-mock'
=======
import NewsletterList from '../../../app/javascript/components/NewsletterList'
import NewsletterDisplayTile from '../../../app/javascript/components/NewsletterDisplayTile'
>>>>>>> parent of 8f124c4... restructured spec folders:spec/javascript/components/NewsletterList.js

describe ('NewsletterList', () => {
  let wrapper;
  let fetchedData;

  beforeEach(() => {
    fetchedData = [
      {
        "description": "desc",
        "id": 1,
        "thumb_photo": {
          "url": "https://newsletter-app-development.s3.amazonaws.com/uploads/newsletter/thumb_photo/1/blue_flowers.jpg"
        },
        "title": "New",
        "founder_name": "test user"
      },
      {
        "description": "desc2",
        "id": 2,
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
    wrapper = mount(
      <NewsletterList setMessage={jasmine.any(Function)} />
    )
  })

  afterEach(fetchMock.restore)

  describe('component initial mount', () => {
    it ('initializes with the correct state', () => {
      expect(wrapper.state()).toEqual({
        newsletters: [],
        openNewsletter: null,
        showForm: false
      })
    })

    it ('renders a NewsletterDisplayTile for each item returned from the api call', (done) => {
      setTimeout(() => {
        expect(wrapper.find(NewsletterDisplayTile)).toBePresent()
        expect(wrapper.find(NewsletterDisplayTile).length).toEqual(fetchedData.length)
        done()
      }, 0)
    })
  })

})
