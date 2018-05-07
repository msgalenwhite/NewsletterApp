require 'rails_helper'

RSpec.describe Api::V1::NewslettersController, type: :controller do

  user = FactoryBot.create(:user)
  news = FactoryBot.create(:newsletter)
  news_two = FactoryBot.create(:newsletter)

  Subscription.create(user: user, newsletter: news)
  Subscription.create(user: user, newsletter: news_two)

  current_user = user

  describe 'GET#index' do
    it "should return a list of newsletters" do
      get :index
      returned_json = JSON.parse(response.body)

      binding.pry

      expect(response.status).to eq(200)
      expect(response.content_type).to eq("application/json")
    end
  end
end
