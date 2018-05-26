require "rails_helper"

describe NewsletterMailer, :type => :mailer do
  let (:newsletter) { FactoryBot.create(:newsletter_with_entries) }
  let (:user) { FactoryBot.create(:user) }
  let (:subscriber) { user.name_and_email }
  let (:test_subscription) { Subscription.create!(user: user, newsletter: newsletter) }
  let (:date) { {year: Date.today.year, month: Date.today.month} }
  let (:entries) { newsletter.formatted_specific_entries(date[:year], date[:month]) }

  # NOTE: for these test I am running the mailer with deliver_now, to make sure the emails can be sent.

  before (:each) do
    NewsletterMailer.send_out(subscriber, date, entries, newsletter).deliver_now
    @test_newsletter = ActionMailer::Base.deliveries[0]
  end

  describe "#send_out" do
    it "sends an email" do
      expect { NewsletterMailer.send_out(subscriber, date, entries, newsletter).deliver_now }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end

    it "renders an email with the correct headers" do
      expect(@test_newsletter.subject).to eq("#{newsletter.title} entries for #{date[:month]}, #{date[:year]}")
      expect(@test_newsletter.to).to eq([subscriber[:email]])
      expect(@test_newsletter.from).to eq(['no-reply@example.com'])
    end
    it "renders the correct body" do
      expect(@test_newsletter.body.encoded).to match("Thank you for being a part of the Family Newsletter, #{subscriber[:name]}!")
      expect(@test_newsletter.body.encoded).to match("Here is your monthly update for #{newsletter.title}")
      expect(@test_newsletter.body.encoded).to match("https://familynewsletter.herokuapp.com/printed_newsletters/#{newsletter.id}/#{date[:month]}/#{date[:year]}")
      expect(@test_newsletter.body.encoded).to match("#{Date::MONTHNAMES[date[:month]]}, #{date[:year]}")
    end

    it "includes the entries" do
      entries.each do |entry|
        expect(@test_newsletter.body.encoded).to match(entry[:title])
        expect(@test_newsletter.body.encoded).to match(entry[:body])
        expect(@test_newsletter.body.encoded).to match(entry[:author])
      end
    end
  end
end
