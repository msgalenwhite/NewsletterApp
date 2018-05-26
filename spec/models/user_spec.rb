require 'rails_helper'

describe User, :type => :model do
  let(:test_user) { FactoryBot.create(:user) }

  context 'validations' do
    it { should have_valid(:first_name).when("name") }
    it { should_not have_valid(:first_name).when(nil, "") }
    it { should have_valid(:last_name).when("name") }
    it { should_not have_valid(:last_name).when(nil, "") }

    it { should have_valid(:bio).when("bio") }
    it { should_not have_valid(:bio).when(nil, "") }

    it { should have_valid(:current_city).when("city") }
    it { should_not have_valid(:current_city).when(nil, "") }

    it { should have_valid(:current_state).when("state") }
    it { should_not have_valid(:current_state).when(nil, "") }
  end

  context 'associations' do
    it { have_many(:newsletters) }
    it { have_many(:subscriptions) }
    it { have_many(:invitations) }
    it { have_many(:entries) }
  end

  context 'methods' do
    describe '#full_name' do
      it 'returns a formatted string with first and last name' do
        expect(test_user.full_name).to eq("#{test_user.first_name} #{test_user.last_name}")
      end
    end

    describe '#name_and_email' do
      it 'returns a hash with the user\'s full name and email' do
        expect(test_user.name_and_email).to eq(
          { name: test_user.full_name, email: test_user.email }
        )
      end
    end
  end
end
