class NewsletterMailer < ApplicationMailer
  def send_out(newsletter_title, entries, recipient_info)
    if Date.today.month == 1
      @newsletter_month = 12
      @newsletter_year = Date.today.year - 1
    else
      @newsletter_month = Date.today.month - 1
      @newsletter_year = Date.today.year
    end

    @recipient_name = recipient_info.name
    @entries = entries
    @newsletter_title = newsletter_title

    mail(to: recipient_info.email)
  end
end
