desc "This task is called by the Heroku scheduler add-on"
task :send_newsletter => :environment do
  puts "Sending Newsletter..."
  MonthlyEmail.send_out
  puts "done."
end