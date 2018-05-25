class CustomJob < ActiveJob::Base
  def perform
    newsletters = Newsletter.all

    date = get_month_and_year

    newsletters.each do |newsletter|
      formatted_newsletter = FormatNewsletter.new(newsletter)

      formatted_newsletter.send_email
    end
  end
end
