# smtp_settings = {}
# if Rails.env.staging? || Rails.env.production?
  smtp_settings = {
    :address        => 'smtp.sendgrid.net',
    :port           => '587',
    :authentication => :plain,
    :user_name      => ENV['SENDGRID_USERNAME'],
    :password       => ENV['SENDGRID_PASSWORD'],
    :domain         => 'herokuapp.com',
    :enable_starttls_auto => true
  }
# end
#
# if Rails.env.development?
#   # mailcatcher configuration
#   smtp_settings = {
#     address: "localhost",
#     port: 1025
#   }
# end
#
if !smtp_settings.empty?
  ActionMailer::Base.smtp_settings = smtp_settings
  ActionMailer::Base.delivery_method = :smtp

  Rails.application.configure do
    config.action_mailer.smtp_settings = smtp_settings
    config.action_mailer.delivery_method = :smtp
  end
end
