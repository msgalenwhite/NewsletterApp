class Api::V1::EntriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    applicable_entries = current_month_entries.where(newsletter_id: params["newsletter_id"].to_i)

    render json: applicable_entries, each_serializer: EntrySerializer, user: current_user
  end

  def create
    entry = Entry.new(entries_params)
    entry.user = current_user
    entry.newsletter_id = params["newsletter_id"].to_i

    if entry.save
      render json: entry
    else
      flash[:message] = "Your entry could not be submitted."
      render json: entry.errors.full_messages.join(" // ")
    end
  end

  def update
    old_entry = Entry.find(params["id"].to_i)
    new_entry = Entry.new(entries_params)

    new_entry.attributes.each do |attribute_name, attribute_value|
      if !attribute_value.nil? && attribute_value == old_entry[attribute_name]
        old_entry[attribute_name] = attribute_value
        old_entry.save!
      end
    end

    render json: old_entry
  end

  private

  def entries_params
    params.permit(:title, :body, :photo)
  end

  def current_month_entries
    current_year = Date.today.year
    current_month = Date.today.month
    Entry.with_year_and_month(current_year, current_month)
  end
end
