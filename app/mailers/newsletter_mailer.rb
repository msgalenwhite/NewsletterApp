class NewsletterMailer < ApplicationMailer
  def monthly_newsletter(newsletter_id)
    if Date.today.month == 1
      newsletter_month = 12
      newsletter_year = Date.today.year - 1
    else
      newsletter_month = Date.today.month - 1
      newsletter_year = Date.today.year
    end



    @newsletter = Newsletter.find(newsletter_id)
    @recipients = @newsletter.subscriber_info

    entries = @newsletter.entries.with_year_and_month(newsletter_year, newsletter_month)
  end
end
