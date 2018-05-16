class NewsletterEntrySerializer < ActiveModel::Serializer
  attributes :title, :founder_name

  has_many :specific_entries, serializer: EntrySerializer

  def founder_name
    object.founder.full_name
  end

  def specific_entries
    year = @instance_options[:year]
    month = @instance_options[:month]
    object.entries.with_year_and_month(year, month)
  end
end
