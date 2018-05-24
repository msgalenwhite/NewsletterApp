require 'rails_helper'

describe Newsletter, :type => :model do
  let(:test_newsletter) { FactoryBot.create(:newsletter) }

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
      it { expect(test_newsletter).to respond_to(:formatted_specific_entries) }
      it { expect(test_newsletter.formatted_specific_entries(2018, 5).class).to eq(Array) }
    end
  end
end
