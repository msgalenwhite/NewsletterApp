class EntrySerializer < ActiveModel::Serializer
  attributes :id, :author, :body, :photo, :title, :date, :newsletter_id, :author_photo_url, :self_submitted

  def author
    object.user.full_name
  end

  def author_photo_url
    object.user.profile_photo.url
  end

  def date
    object.created_at.strftime("%m-%d")
  end

  def self_submitted
    @instance_options[:user] == object.user
  end
end
