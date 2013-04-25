class GistsController < ApplicationController
  respond_to :json
  # before_filter { |c| c.current_user?(
 #    session[:remember_token], params[:user_id]
 #    )}

  def index
    if params[:user_id]
      #@gists = Gist.where("user_id = ?", params[:user_id])
      @gists = User.find(params[:user_id]).gists
    else
      @gists = Gist.all
    end

    render json: @gists
  end

  def show
    @gist = Gist.find(params[:id])

    render json: @gist
  end

  def create
    @gist.new(params[:gist])
    if @gist.save
      render @gist
    else
      render @gist.errors, status: 422
    end
  end

  def destroy
    Gist.find(params[:id]).destroy
  end
end
