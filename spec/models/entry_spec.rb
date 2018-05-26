require 'rails_helper'

describe Entry, :type => :model do
  let(:sample_entry) { FactoryBot.create(:entry) }

  context 'validations' do
    it { should have_valid(:title).when("title") }
    it { should_not have_valid(:title).when(nil, "") }

    it { should have_valid(:body).when("body") }
    it { should_not have_valid(:body).when(nil, "") }
  end

  context 'methods' do
    describe '#info_with_author' do
      it { expect(sample_entry).to respond_to(:info_with_author) }
      it { expect(sample_entry.info_with_author.class).to eq(Hash) }
      it { expect(sample_entry.info_with_author).to eq(
        {
          author: sample_entry.user.full_name,
          title: sample_entry.title,
          body: sample_entry.body,
          photo: sample_entry.photo.url
        }
      )}
    end
  end
end
