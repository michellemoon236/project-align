class ApplicationController < ActionController::Base

  def welcome
    redirect_to home_path if user_signed_in?
  end

end
