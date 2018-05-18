desc "This task is called by the Heroku scheduler add-on"

task :send_newsletter => :environment do
  puts "Sending Newsletter..."
  CustomJob.new.perform()
  puts "done."
end
