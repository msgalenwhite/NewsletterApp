class MonthlyEmail
  def self.send_out
    #get all of the newsletters
    newsletters = Newsletter.all

    #get newsletter's year and month
    date = get_month_and_year

    #FOR EACH NEWSLETTER:
    newsletters.each do |newsletter|
      # get all applicable entries
      entries = newsletter.formatted_specific_entries(date[:year], date[:month])
      # get all subscribers
      subscribers = newsletter.subscriber_info

      # FOR EACH SUBSCRIBER
      subscribers.each do |subscriber|
      # call NewsletterMailer.send_out(newsletter, recipient_info)
        NewsletterMailer.send_out(date, subscriber, entries, newsletter.title, newsletter.id)
      end
    end
  end

  def self.get_month_and_year
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
