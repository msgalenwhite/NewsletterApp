require 'rails_helper'

describe Api::V1::NewslettersController, :type => :controller do
  let(:user) { FactoryBot.create(:user_with_subscriptions) }
  let(:newsletter) { FactoryBot.create(:newsletter, founder_id: user.id) }

  before(:each) do

  end

  describe '#index' do
    it 'returns the same number of newsletters as the current_user has subscriptions' do
      allow(controller).to receive(:current_user) { user }
      get :index
      @returned_json = JSON.parse(response.body)

      expect(response.content_type).to eq("application/json")
      expect(@returned_json).to be_a Array
      expect(@returned_json.length).to eq(user.newsletters.length)
    end
  end

  describe '#show' do
    it 'returns a hash with the correct keys' do
      allow(controller).to receive(:current_user) { newsletter.founder }
      get :show, params: { id: newsletter.id }
      @returned_json = JSON.parse(response.body)

      expect(response.content_type).to eq("application/json")
      expect(@returned_json).to be_a Hash
      expect(@returned_json.keys).to eq(["title", "description", "founder_name", "photo", "is_founder"])
    end
  end
end
