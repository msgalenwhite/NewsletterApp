class NewsletterMailer < ApplicationMailer
  def send_out(date, recipient_info, entries, newsletter_title, newsletter_id)
    @newsletter_month = date[:month]
    @newsletter_year = date[:year]
    @recipient_name = recipient_info[:name]
    @recipient_email = recipient_info[:email]
    @entries = entries
    @newsletter_title = newsletter_title
    @id = newsletter_id

    mail(
      to: @recipient_email,
      subject: "#{@newsletter_title} entries for #{@newsletter_month}, #{@newsletter_year}",
      template_path: 'newsletter_mailer',
      template_name: 'send_out'
    )
  end
end
