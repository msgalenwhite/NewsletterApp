class InvitationBatch
  attr_reader :errors, :invitees
  #may require some additional context around the newsletter
  def initialize(options)
    @invitees = options[:invitees]
    @host = options[:host]
    @newsletter = options[:newsletter]
    @invitations = []
    @errors = []
  end

  def dispatch
    @invitations = @invitees.map do |payload|
      invitation = Invitation.new do |invitation|
        invitation.host = @host
        invitation.newsletter = @newsletter
        invitation.email = payload["email"]
        invitation.name = payload["name"]
      end

      invitation.valid?
      invitation
    end

    if all_valid?

      @invitations.each {|i| i.save! }

      #TODO: this is where we dispatch all the emails
      @invitations.each do |invite|
        InvitationMailer.new_invite(invite).deliver_now
      end
      return true
    else

      #TODO: build our error data structure
      @invitations.each do |invite|
        if invite.errors
          @errors << { invite.name: invite.errors.full_messages }
        end
      end
      return false
    end
  end

  def all_valid?
    @invitations.all?{|i| i.errors.size == 0}
  end
end
