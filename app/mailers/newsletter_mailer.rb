class NewsletterMailer < ApplicationMailer
  def send_out(newsletter_id, recipient_info)
    newsletter = Newsletter.find(newsletter_id)

    if Date.today.month == 1
      @newsletter_month = 12
      @newsletter_year = Date.today.year - 1
    else
      @newsletter_month = Date.today.month - 1
      @newsletter_year = Date.today.year
    end

    @recipient_name = recipient_info.name
    @entries = newsletter.formatted_specific_entries(@newsletter_year, @newsletter_month)
    @newsletter_title = newsletter.title

    mail(to: recipient_info.email)
  end
end
