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

  context 'methods' do
    describe '#full_name' do
      it { expect(test_user).to respond_to(:full_name) }
      it { expect(test_user.full_name).to eq("#{test_user.first_name} #{test_user.last_name}") }
    end

    describe '#name_and_email' do
      it { expect(test_user).to respond_to(:name_and_email) }
      it { expect(test_user.name_and_email).to eq(
        { name: test_user.full_name, email: test_user.email }
      )}
    end
  end
end
