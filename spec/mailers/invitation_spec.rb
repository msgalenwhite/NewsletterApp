require "rails_helper"

describe InvitationMailer, :type => :mailer do
  let(:invite) { FactoryBot.create(:invitation) }

  before (:each) do
    InvitationMailer.new_invite(invite).deliver_now
    @test_invitation = ActionMailer::Base.deliveries[0]
  end

  describe "#new_invite" do
    it "sends an email" do
      expect { InvitationMailer.new_invite(invite).deliver_now }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end

    it "renders an email with the correct headers" do
      expect(@test_invitation.subject).to eq('New invite')
      expect(@test_invitation.to).to eq([invite.email])
      expect(@test_invitation.from).to eq(['no-reply@example.com'])
    end

    it "renders the correct body" do
      expect(@test_invitation.body.encoded).to match("#{invite.host.full_name} would like to invite you to a new Family Newsletter!")
      expect(@test_invitation.body.encoded).to match("They've called it #{invite.newsletter.title}")
      expect(@test_invitation.body.encoded).to match("their description was:\r\n#{invite.newsletter.description}.")
    end
  end
end
