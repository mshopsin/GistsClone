class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_name(params[:user][:name])
    if @user
      session[:remember_token] = @user.id
      current_user = @user
      render json: session[:remember_token]
    else
      render json: { errors: "Not a user, try again" }
    end
  end

  def destroy
      session[:remember_token] = nil
  end
end
