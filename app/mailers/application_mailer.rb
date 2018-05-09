class ApplicationMailer < ActionMailer::Base
  default from: ENV[EMAIL]
end
