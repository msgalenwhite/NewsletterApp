desc "This task is called by the Heroku scheduler add-on"
task :send_newsletter => :environment do
  puts "Checking date..."
  if Time.now.day == 1
    puts "Sending Newsletter..."
    CustomJob.new.perform()
    puts "done."
  end
end
