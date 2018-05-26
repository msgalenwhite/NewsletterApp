require 'rails_helper'

describe Invitation, :type =>  :model do
  context 'validations' do
    it { should have_valid(:email).when("email@email.com") }
    it { should_not have_valid(:email).when(nil, "") }

    it { should have_valid(:name).when("name") }
    it { should_not have_valid(:name).when(nil, "") }
  end

  context 'associations' do
    it { belong_to(:host) }
    it { belong_to(:newsletter) }
  end
end
