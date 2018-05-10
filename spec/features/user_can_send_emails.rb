require 'rails_helper'

xfeature "user can send emails" do
  scenario "with a valid email, an invitation can be sent" do
    ActionMailer::Base.deliveries = [] #clear previous test emails

    ### using capybara, do necessary steps to send email

    expect(ActionMailer::Base.deliveries.size).to eq(1) #make sure there's only the new one
    last_email = ActionMailer::Base.deliveries.last #we can look at the latest email
  end
end
