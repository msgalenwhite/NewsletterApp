require 'rails_helper'

describe Entry, :type => :model do
  context 'validations' do
    it { should have_valid(:title).when("title") }
    it { should_not have_valid(:title).when(nil, "") }

    it { should have_valid(:body).when("body") }
    it { should_not have_valid(:body).when(nil, "") }
  end
end
