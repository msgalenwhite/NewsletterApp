class ApplicationMailer < ActionMailer::Base
  default from: "\"Family Newsletter\" <#{ENV[email]}>"
end
