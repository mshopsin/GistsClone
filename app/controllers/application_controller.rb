class ApplicationController < ActionController::Base
  protect_from_forgery

  def current_user
    @current_user || User.find(session[:remember_token])
  end

  def current_user=(user)
    @current_user = user
  end

  def current_user?(remember_token, user_id)
    if remember_token != user_id
      render json: { errors: 'error' }, status: 422
    end
  end
end
