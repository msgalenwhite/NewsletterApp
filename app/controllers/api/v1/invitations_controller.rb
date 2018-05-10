class Api::V1::InvitationsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    binding.pry
#     params["emails"].each do |infoHash|
#       invite = Invitation.create(
#         host: current_user,
#         newsletter_id: params["newsletterId"],
#         email: infoHash["email"],
#         name: infoHash["name"]
#       )
# #       Error: NameError (uninitialized constant ApplicationMailer::EMAIL):
# #
# # app/mailers/application_mailer.rb:2:in `<class:ApplicationMailer>'
# # app/mailers/application_mailer.rb:1:in `<main>'
# # app/mailers/invitation_mailer.rb:1:in `<main>'
# # app/controllers/api/v1/invitations_controller.rb:15:in `block in create'
# # app/controllers/api/v1/invitations_controller.rb:5:in `each'
# # app/controllers/api/v1/invitations_controller.rb:5:in `create'
#
#       if invite.save
#         InvitationMailer.new_invitation(invite).deliver_now
#         flash[:success] = "Your emails have been sent!"
#
#         render json: ["Success!"]
#
#       else
#         flash[:error] = invite.errors.full_messages.join(' // ')
#
#         render json: ["Errors"]
#       end
#     end
#   end
#
#   # private
#
#   # def invites_params
#   #   params.require(:emails).permit(:email, :name)
#   # end
# end
end
