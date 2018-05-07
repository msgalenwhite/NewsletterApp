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
    @newsletter.user = current_user

    if @newsletter.save
      flash[:success] = 'Your newsletter is up and ready to go!'
      redirect_to root_path
    else
      flash[:alert] = @newsletter.errors.full_messages.join(" // ")
      render 'new'
    end
  end

  private

  def newsletter_params
    params.require(:newsletter).permit(:title, :description, :thumb_photo)
  end
end
