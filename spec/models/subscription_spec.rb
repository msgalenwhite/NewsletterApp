require 'rails_helper'

describe Subscription, :type => :model do
  context 'associations' do
    it { belong_to(:user) }
    it { belong_to(:newsletter) }
  end
end
