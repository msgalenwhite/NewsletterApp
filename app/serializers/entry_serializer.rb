class EntrySerializer < ActiveModel::Serializer
  attributes :id, :author, :description, :photo, :title, :date, :newsletter_id

  def author
    object.user.full_name
  end

  def photo
    object.photo.url
  end

  def date
    object.created_at.strftime("%m-%d")
  end
end
