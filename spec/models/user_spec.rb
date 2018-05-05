require 'rails_helper'

describe User, :type => :model do
  context 'validations' do
    it { should have_valid(:first_name).when("name") }
    it { should_not have_valid(:first_name).when(nil, "") }
    it { should have_valid(:last_name).when("name") }
    it { should_not have_valid(:last_name).when(nil, "") }

    it { should have_valid(:pic_url).when("url") }
    it { should_not have_valid(:pic_url).when(nil, "") }

    it { should have_valid(:bio).when("bio") }
    it { should_not have_valid(:bio).when(nil, "") }

    it { should have_valid(:current_city).when("city") }
    it { should_not have_valid(:current_city).when(nil, "") }

    it { should have_valid(:current_state).when("state") }
    it { should_not have_valid(:current_state).when(nil, "") }
  end
end
