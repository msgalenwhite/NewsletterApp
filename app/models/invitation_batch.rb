class InvitationBatch
  attr_reader :errors, :invitees

  def initialize(options)
    @invitees = options[:invitees]
    @host = options[:host]
    @newsletter = options[:newsletter]
    @invitations = form_invitations
    @errors = []
  end

  def dispatch
    if all_valid?
      @invitations.each {|i| i.save! }

      @invitations.each do |invite|
        InvitationMailer.new_invite(invite).deliver_later
      end
      return true
    else
      form_errors
      return false
    end
  end

  def all_valid?
    @invitations.all?{|i| i.errors.size == 0}
  end

  def form_invitations
    invites = []
    @invitees.each do |person_array|
      new = Invitation.new(
        host: @host,
        newsletter: @newsletter,
        name: person_array[:name],
        email: person_array[:email]
      )

      new.valid?
      invites << new
    end
    invites
  end

  def form_errors
    @invitations.each do |invite|
      if !invite.valid?
        @errors << {
          name: invite.name,
          errors: invite.errors.full_messages
        }
      end
    end
    @errors
  end
end
