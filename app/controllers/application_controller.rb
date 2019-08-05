class ApplicationController < ActionController::Base

  def welcome
    redirect_to projects_path if user_signed_in?
  end

end
