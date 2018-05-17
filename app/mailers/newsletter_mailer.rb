class NewsletterMailer < ApplicationMailer
  def send_out(date, recipient_info, entries, newsletter_title)
    @newsletter_month = date.month
    @newsletter_year = date.year
    @recipient_name = recipient_info.name
    @entries = entries
    @newsletter_title = newsletter_title

    mail(to: recipient_info.email)
  end
end
