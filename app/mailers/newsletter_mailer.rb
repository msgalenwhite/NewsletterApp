class NewsletterMailer < ApplicationMailer
  def send_out(subscriber, date, entries, newsletter)
    @newsletter_month = date[:month]
    @newsletter_year = date[:year]
    @recipient_name = subscriber[:name]
    @recipient_email = subscriber[:email]
    @entries = entries
    @newsletter_title = newsletter.title
    @id = newsletter.id

    mail(
      to: @recipient_email,
      subject: "#{@newsletter_title} entries for #{@newsletter_month}, #{@newsletter_year}",
      template_path: 'newsletter_mailer',
      template_name: 'send_out'
    )
  end
end
