class CustomJob < ActiveJob::Base
  def perform
    newsletters = Newsletter.all

    date = get_month_and_year

    newsletters.each do |newsletter|

      entries = newsletter.formatted_specific_entries(date[:year], date[:month])

      subscribers = newsletter.subscriber_info

      subscribers.each do |subscriber|
        NewsletterMailer.send_out(date, subscriber, entries, newsletter.title, newsletter.id).deliver_later
      end
    end
  end

  def get_month_and_year
    if Date.today.month == 1
      newsletter_month = 12
      newsletter_year = Date.today.year - 1
    else
      newsletter_month = Date.today.month - 1
      newsletter_year = Date.today.year
    end

    { year: newsletter_year, month: newsletter_month }
  end
end
