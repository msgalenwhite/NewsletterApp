class PrintedNewslettersController < ApplicationController
  def show
    @newsletter = Newsletter.find(params[:id])
    @entries = @newsletter.entries

    current_year = Date.today.year
    current_month = Date.today.month

    ### challenge = how do we know what month they want?
    @entries = @newsletters.entries.with_year_and_month(current_year, current_month)
  end



end
