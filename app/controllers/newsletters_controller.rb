class NewslettersController < ApplicationController
  def new
    if !current_user
      flash[:alert] = 'You must be logged in to create a newsletter!'
      redirect_to root_path
    end

    @newsletter = Newsletter.new
  end

  def create
    @newsletter = Newsletter.new(newsletter_params)
    @newsletter.founder = current_user

    subscription = Subscription.new(user: current_user, newsletter: @newsletter)

    if @newsletter.save && subscription.save
      flash[:success] = 'Your newsletter is up and ready to go!'
      redirect_to root_path
    else
      flash[:alert] = @newsletter.errors.full_messages.join(" // ")
      render 'new'
    end
  end

  def show
    api_key = ENV["GOOGLE_MAPS_API_KEY"]
    @source = "https://maps.googleapis.com/maps/api/js?key=#{api_key}&callback=initMap"

    @newsletter = Newsletter.find(params[:id])
    if !current_user
      flash[:alert] = 'You must be logged in to view this page!'
      redirect_to new_user_session_path
    elsif !current_user.newsletters.include?(@newsletter)
      flash[:alert] = 'You must be a member before you can view a Newsletter.'
      redirect_to root_path
    else
      render 'show'
    end
  end

  private

  def newsletter_params
    params.require(:newsletter).permit(:title, :description, :thumb_photo)
  end
end
