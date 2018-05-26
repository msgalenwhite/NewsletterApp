require 'rails_helper'

describe FormatNewsletter do
  let(:last_year) { Date.today.year - 1 }
  let(:newsletter) { FactoryBot.create(:newsletter_with_entries) }
  let(:old_entry) { FactoryBot.create(:entry, newsletter: newsletter, created_at: Date.new(last_year, Date.today.month, Date.today.day)) }
  let(:formatted_newsletter) { FormatNewsletter.new(newsletter) }

  after(:each) do
    Timecop.return
  end

  describe '#get_month_and_year' do
    it 'during January it returns December of the previous year' do
      Timecop.freeze(Date.new(2018, 1, 1)+1)

      expect(formatted_newsletter.get_month_and_year).to eq({ year: 2017, month: 12 })
    end
    it 'not during January it returns the previous month of the current year' do
      Timecop.freeze(Date.new(2018, 7, 1)+1)

      expect(formatted_newsletter.get_month_and_year).to eq({ year: 2018, month: 6 })
    end
  end

  describe '#send_email' do
    it 'sends an email' do
      #there is a problem here because it is looking for Redis:

      # Error connecting to Redis
      # expect{ formatted_newsletter.send_email }.to change { ActionMailer::Base.deliveries.count }.by 1
    end
  end
end
