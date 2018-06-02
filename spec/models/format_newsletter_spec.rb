require 'rails_helper'

describe FormatNewsletter do
  let(:newsletter) { FactoryBot.create(:newsletter_with_entries) }
  let(:formatted_newsletter) { FormatNewsletter.new(newsletter) }

  after(:each) do
    Timecop.return
  end

  describe '#get_month_and_year' do
    it 'during January it returns December of the previous year' do
      Timecop.freeze(Time.utc(2008, 1, 10, 10, 10))

      expect(formatted_newsletter.get_month_and_year).to eq({ year: 2007, month: 12 })
    end
    it 'not during January it returns the previous month of the current year' do
      Timecop.freeze(Time.utc(2008, 2, 10, 10, 10))

      expect(formatted_newsletter.get_month_and_year).to eq({ year: 2008, month: 1 })
    end
  end
end
