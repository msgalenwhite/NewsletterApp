class EntrySerializer < ActiveModel::Serializer
  attributes :id, :author, :body, :photo, :title, :date, :newsletter_id, :author_photo_url

  def author
    object.user.full_name
  end

  def photo
    object.photo.url
  end

  def author_photo_url
    object.user.profile_photo.url
  end

  def date
    object.created_at.strftime("%m-%d")
  end
end