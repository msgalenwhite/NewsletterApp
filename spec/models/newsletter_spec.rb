require 'rails_helper'

describe Newsletter, :type => :model do
  test_user = FactoryBot.create(:user)

  context 'validations' do
    it { should have_valid(:title).when("title") }
    it { should_not have_valid(:title).when(nil, "") }

    it { should have_valid(:description).when("description") }
    it { should_not have_valid(:description).when(nil, "") }

    it { should have_valid(:founder).when(test_user) }
    it { should_not have_valid(:founder).when(nil) }
  end
end
