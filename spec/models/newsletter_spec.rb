require 'rails_helper'

describe Newsletter, :type => :model do
  test_user = FactoryBot.create(:user)

  context 'validations' do
    it { should have_valid(:title).when("title") }
    it { should_not have_valid(:title).when(nil, "") }

    it { should have_valid(:description).when("description") }
    it { should_not have_valid(:description).when(nil, "") }
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
        ) }
    end
  end
end
