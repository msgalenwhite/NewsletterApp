require 'rails_helper'

feature 'user creates a newsletter', %Q{
  As a signed-in user,
  I can start a Newsletter
  so I can keep in touch with my family.
} do

  scenario 'user submits title, description and picture' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'
    visit new_newsletter_path

    fill_in 'Title', with: 'This is a title'
    fill_in 'Description', with: 'description'
    attach_file :newsletter_thumb_photo, "#{Rails.root}/spec/support/images/purple_flowers.jpg"

    click_button 'Create'

    expect(page).to have_content('Your newsletter is up and ready to go!')
  end

  scenario 'get an error if description is missing' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'
    visit new_newsletter_path
    click_button 'Create'

    expect(page).to have_content("can't be blank")
  end

  scenario 'user must be logged in to create a newsletter' do
    visit new_newsletter_path

    expect(page).to have_content('You must be logged in to create a newsletter!')
  end
end
