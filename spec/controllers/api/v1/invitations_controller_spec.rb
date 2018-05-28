require 'rails_helper'

describe Api::V1::InvitationsController, :type => :controller do
  let(:newsletter) { FactoryBot.create(:newsletter) }
  let(:user) { FactoryBot.create(:user) }
  let(:emails) { [{name: 'Test Name', email: 'test@test.com'}] }

  describe '#create' do
    it 'creates Invitations from the array of email objects passed in' do
      allow(controller).to receive(:current_user) { user }
      prev_count = Invitation.count
      post :create, params: { newsletterId: newsletter.id, emails: emails }

      expect(Invitation.count).to eq(prev_count + emails.length)
      expect(JSON.parse(response.body).keys).to eq(["invitees", "host", "newsletter", "errors"])

      expect(response.status).to eq 201
      expect(response.content_type).to eq("application/json")

      #error connecting to Redis?
    end
  end
end
