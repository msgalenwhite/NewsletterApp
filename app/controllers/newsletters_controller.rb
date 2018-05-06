class NewsletterController < ApplicationController
  def new
    @newsletter = Newsletter.new
  end

  def create
    @newsletter = Newsletter.new(newsletter_params)

    if @newsletter.save
      flash[:success] = 'Your newsletter is up and ready to go!'
      redirect_to 'root'
    else
      flash[:alert] = @newsletter.errors.full_messages.join("\n")
      render 'new'
  end

  private

  def newsletter_params
    params.require(:newsletter).permit(:description, :thumb_photo)
  end
end
