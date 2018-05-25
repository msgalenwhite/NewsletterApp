require 'rails_helper'

feature "user receives a monthly email" do
  scenario "monthly is sent" do
    ActionMailer::Base.deliveries.clear
    #send an email
    

    expect(ActionMailer::Base.deliveries.count).to eq(1)
  end
end
