class FormatNewsletter
  attr_reader :newsletter_entries
  
  def initialize (newsletter)
    @newsletter = newsletter
    @newsletter_entries = get_correct_entries
    @subscribers = newsletter.subscriber_info
  end

  def send_email
    @subscribers.each do |subscriber|
      NewsletterMailer.send_out(subscriber, get_month_and_year, @newsletter_entries, @newsletter).deliver_later
    end
  end

  def get_correct_entries
    date = get_month_and_year
    @newsletter.formatted_specific_entries(date[:year], date[:month])
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
