require 'rails_helper'

describe InvitationBatch do
  let(:valid_invitee_array) {[
    {name: 'Tester1', email: 'Tester1@test.com'},
    {name: 'Tester2', email: 'Tester2@test.com'},
    {name: 'Tester3', email: 'Tester3@test.com'}
  ]}
  let(:invalid_invitee_array) {[
    {name: '', email: 'Tester1@test.com'},
    {name: 'Tester2', email: ''},
    {name: 'Tester3', email: 'Tester@test.com'}
  ]}
  let(:newsletter) { FactoryBot.create(:newsletter) }
  let(:user) { FactoryBot.create(:user) }
  let(:good_batch) { InvitationBatch.new({
    invitees: valid_invitee_array,
    host: user,
    newsletter: newsletter
  }) }
  let(:bad_batch) { InvitationBatch.new({
    invitees: invalid_invitee_array,
    host: user,
    newsletter: newsletter
  }) }
  let(:test_invitation) { FactoryBot.create(:invitation) }

  it 'has attr_readers for errors and invitees' do
    expect(good_batch.errors).to be_a(Array)
    expect(good_batch.invitees).to be_a(Array)
  end

  describe '#all_valid?' do
    it 'returns false if invitee array has errors' do
      expect(bad_batch.all_valid?).to eq(false)
    end

    it 'returns true if none have errors' do
      expect(good_batch.all_valid?).to eq(true)
    end
  end

  describe '#form_errors' do
    it 'creates an array of hashes from invalid entries' do
      bad_batch.form_errors
      expect(bad_batch.errors[0][:errors]).to eq(["Name can't be blank"])
      expect(bad_batch.errors[0][:name]).to eq("")
    end
    it 'does not create an entry if the invite is valid' do
      bad_batch.form_errors
      expect(bad_batch.errors.length).to eq 2
    end
  end

  describe '#form_invitations' do
    it 'creates an array of Invitation objects where host is @host and newsletter is @newsletter' do
      expect(good_batch.form_invitations).to be_a(Array)
      expect(good_batch.form_invitations[0]).to be_a(Invitation)
      expect(good_batch.form_invitations[0].host).to eq(user)
      expect(good_batch.form_invitations[0].newsletter).to eq(newsletter)
    end
  end
end
