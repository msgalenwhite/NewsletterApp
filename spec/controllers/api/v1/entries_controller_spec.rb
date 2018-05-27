require 'rails_helper'

describe Api::V1::EntriesController, :type => :controller do
  let(:newsletter) { FactoryBot.create(:newsletter_with_entries) }
  let(:user) { FactoryBot.create(:user) }
  let(:not_current_user) { FactoryBot.create(:user) }

  describe 'GET #index' do
    before(:each) do
      get :index, params: { newsletter_id: newsletter.id }
      @returned_json = JSON.parse(response.body)
    end

    it 'returns an array of hashes with the correct keys' do
      expect(@returned_json).to be_a(Array)
      expect(@returned_json[0]).to be_a(Hash)
      expect(@returned_json[0].keys).to eq(
        ["id", "author", "body", "photo", "title", "date", "newsletter_id", "author_photo_url", "self_submitted"]
      )
    end
    it 'only returns entries from the specific newsletter' do
      @returned_json.each do |json_entry|
        expect(json_entry["newsletter_id"]).to eq(newsletter.id)
      end
    end
    it 'returns a response with the correct status and content_type' do
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    end
  end

  describe 'POST #create' do
    before(:each) do
      allow(controller).to receive(:current_user) { user }
    end

    it 'creates a new entry' do
      allow(controller).to receive(:params).and_return(
        ActionController::Parameters.new(
          title: 'Sample Title',
          body: 'Sample Body',
          newsletter_id: newsletter.id,
          photo: {url: "#{Rails.root}/spec/support/images/purple_flowers.jpg"},
          entry_id: "undefined",
          controller: '/api/v1/entries',
          action: 'create'
        )
      )

      prev_count = Entry.count
      post(:create)
      expect(Entry.count).to eq(prev_count + 1)
      expect(JSON.parse(response.body).keys).to eq(["id", "author", "body", "photo", "title", "date", "newsletter_id", "author_photo_url", "self_submitted"])

      expect(response.status).to eq 201
      expect(flash[:error]).not_to be_present
      expect(response.content_type).to eq("application/json")
    end

    context 'new entry could not be created' do
      it 'sets a flash message' do
        allow(controller).to receive(:params).and_return(
          ActionController::Parameters.new(
            title: '',
            body: '',
            newsletter_id: newsletter.id,
            photo: {url: "#{Rails.root}/spec/support/images/purple_flowers.jpg"},
            entry_id: "undefined",
            controller: '/api/v1/entries',
            action: 'create'
          )
        )

        prev_count = Entry.count
        post(:create)
        expect(Entry.count).to eq(prev_count)
        expect(flash[:error]).to be_present

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
      end
    end
  end

  describe 'PUT/PATCH #update' do
    before(:each) do
      allow(controller).to receive(:current_user) { user }
      @new_entry = Entry.create!(
        title: 'Test',
        body: 'Test Body',
        newsletter: newsletter,
        user: user
      )
    end

    context 'entry is able to be updated' do
      it 'returns the updated entry' do
        allow(controller).to receive(:params).and_return(
          ActionController::Parameters.new(
            title: 'Sample Title',
            body: 'Sample Body',
            newsletter_id: newsletter.id,
            photo: {url: "#{Rails.root}/spec/support/images/purple_flowers.jpg"},
            entry_id: "undefined",
            controller: "/api/v1/entries/#{@new_entry.id}",
            action: 'create',
            id: @new_entry.id
          )
        )
        put :update, params: { id: @new_entry.id }
        update_response = JSON.parse(response.body)

        expect(update_response["title"]).to eq("Sample Title")
        expect(update_response["body"]).to eq("Sample Body")
        expect(flash[:error]).not_to be_present
        expect(response.content_type).to eq("application/json")
      end
    end

    context 'entry cannot be updated' do
      it 'sets a flash message and returns errors' do
        allow(controller).to receive(:params).and_return(
          ActionController::Parameters.new(
            title: '',
            body: 'Sample Body',
            newsletter_id: newsletter.id,
            photo: {url: "#{Rails.root}/spec/support/images/purple_flowers.jpg"},
            entry_id: "undefined",
            controller: "/api/v1/entries/#{@new_entry.id}",
            action: 'create',
            id: @new_entry.id
          )
        )
        put :update, params: { id: @new_entry.id }

        expect(flash[:error]).to be_present
        expect(response.content_type).to eq("application/json")
      end

      it 'if the entry is not from the current user, it is not updated' do
        @new_entry.user = not_current_user
        @new_entry.save!

        allow(controller).to receive(:params).and_return(
          ActionController::Parameters.new(
            title: 'Sample Title',
            body: 'Sample Body',
            newsletter_id: newsletter.id,
            photo: {url: "#{Rails.root}/spec/support/images/purple_flowers.jpg"},
            entry_id: "undefined",
            controller: "/api/v1/entries/#{@new_entry.id}",
            action: 'create',
            id: @new_entry.id
          )
        )
        put :update, params: { id: @new_entry.id }

        expect(flash[:error]).to be_present
        expect(response.content_type).to eq("application/json")
      end
    end
  end
end
