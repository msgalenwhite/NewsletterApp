class Api::V1::InvitationsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    newsletter = Newsletter.find(params["newsletterId"])
    # binding.pry
    first_item = params["emails"][0]
    test_invitation = Invitation.new(
      email: first_item["email"],
      name: first_item["name"],
      newsletter: newsletter,
      host: current_user
    )

    if test_invitation.save
      Invitation.send_invite(self).deliver #send_invite creates email, then deliver will send it - ActionMailer provides deliver
      return true
    else
      return false
    end
  end
#     params["emails"].each do |infoHash|
#       invite = Invitation.create(
#         host: current_user,
#         newsletter: newsletter,
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
#       respond_to do |format|
#         if invite.save
#           # InvitationMailer.new_invitation(invite).deliver_now
#           InvitationMailer.with(
#             host: invite.host.full_name,
#             newsletter: newsletter.title,
#             description: newsletter.description,
#             email: invite.email,
#             name: invite.name
#           ).invitation_email.deliver_now
#
#           flash[:success] = "Your invitations have been sent!"
#
#           format.html (
#             render json: invite
#           )
#           format.json (
#             render json: invite, status: :sent, location: invite
#           )
#
#         else
#           flash[:error] = "Your invitations could not be sent."
#
#           format.html (
#             render json: invite.errors.full_messages,
#             status: :unprocessable_entity
#           )
#         end
#       end
#     end
#   end

  # private

  # def invites_params
  #   params.require(:emails).permit(:email, :name)
  # end
end
