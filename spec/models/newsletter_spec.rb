require 'rails_helper'

describe Newsletter, :type => :model do
  let(:test_newsletter) { FactoryBot.create(:newsletter) }
  let(:test_newsletter_with_entries) { FactoryBot.create(:newsletter_with_entries) }

  context 'validations' do
    it { should have_valid(:title).when("title") }
    it { should_not have_valid(:title).when(nil, "") }

    it { should have_valid(:description).when("description") }
    it { should_not have_valid(:description).when(nil, "") }
  end

  context 'methods' do
    describe '#subscriber_info' do
      it { expect(test_newsletter).to respond_to(:subscriber_info) }
      it { expect(test_newsletter.subscriber_info.class).to eq(Array) }
    end

    describe '#formatted_specific_entries' do
      it { expect(test_newsletter_with_entries).to respond_to(:formatted_specific_entries) }
      it { expect(test_newsletter_with_entries.formatted_specific_entries(Date.today.year, Date.today.month).class).to eq(Array) }
      it { expect(test_newsletter_with_entries.formatted_specific_entries(Date.today.year, Date.today.month).length).to eq(test_newsletter_with_entries.entries.length) }
    end
  end
end
