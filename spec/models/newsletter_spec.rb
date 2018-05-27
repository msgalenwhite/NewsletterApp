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

  context 'associations' do
    it { belong_to(:founder) }
    it { have_many(:users) }
    it { have_many(:subscriptions) }
    it { have_many(:entries) }
  end

  context 'methods' do
    describe '#subscriber_info' do
      it 'returns an array of user info hashes' do
        test_user = test_newsletter_with_entries.users[0]
        expect(test_newsletter_with_entries.subscriber_info[0]).to eq(test_user.name_and_email)
        expect(test_newsletter_with_entries.subscriber_info.length).to eq(test_newsletter_with_entries.users.length)
      end
    end

    describe '#formatted_specific_entries' do
      it 'creates an array of the correct length when called' do
        expect(test_newsletter_with_entries.formatted_specific_entries(Date.today.year, Date.today.month).class).to eq(Array)
        expect(test_newsletter_with_entries.formatted_specific_entries(Date.today.year, Date.today.month).length).to eq(test_newsletter_with_entries.entries.length)
      end
      it 'returns entries that are formatted correctly' do
        first_entry = test_newsletter_with_entries.entries[0]
        result = test_newsletter_with_entries.formatted_specific_entries(Date.today.year, Date.today.month)

        expect(result.length).to eq(test_newsletter_with_entries.entries.length)
        expect(first_entry.info_with_author).to eq(result[0])
      end
    end
  end
end
