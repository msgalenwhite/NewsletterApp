require 'rails_helper'

describe 'rake send_newsletter', :type => :task do
  let(:newsletter) { FactoryBot.create(:newsletter_with_entries) }

  after(:each) do
    Timecop.return
  end

  it 'preloads the Rails environment' do
    expect(task.prerequisites).to include 'environment'
  end

  it 'if not the first of the month, it only logs that it is checking the date' do
    Timecop.freeze(Date.new(2018, 1, 10))

    expect{ task.execute }.to output("Checking date...\n").to_stdout
    expect{ task.execute }.not_to output("Sending Newsletter...\n").to_stdout
  end

  context 'on the first of the month' do
    before(:each) do
      Timecop.freeze(Date.new(2018, 1, 1))
    end

    it 'logs both that it is checking the date and that it is sending a newsletter' do
      expect{ task.execute }.to output("Checking date...\nSending Newsletter...\ndone.\n").to_stdout
    end
  end
end
