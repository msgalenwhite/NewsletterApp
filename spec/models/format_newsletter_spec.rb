require 'rails_helper'

describe FormatNewsletter do
  let(:newsletter) { FactoryBot.create(:newsletter_with_entries) }
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
end
