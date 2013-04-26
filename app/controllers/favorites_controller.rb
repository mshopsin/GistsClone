class FavoritesController < ApplicationController
  def index
    if session[:remember_token]
      #@gists = Gist.where("user_id = ?", params[:user_id])
      @favs = User.find(session[:remember_token]).favorites
    else
      @favs = Favorite.all
    end

    render json: @favs
  end

  def create
    @favorite = Favorite.new(
      gist_id: params[:gist_id], user_id: session[:remember_token]
    )
    if @favorite.save
      render json: @favorite
    else
      render json: @favorite.errors, status: 422
    end
  end

  def destroy
    @fav = Favorite.find(params[:id])
    if @fav.user_id ==  session[:remember_token]
      if @fav.destroy
        render json: { status: "successful deletion" }
      else
        render json: { status: "failed to delete"}
      end
    end
  end
end
