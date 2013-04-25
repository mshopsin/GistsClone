class FavoritesController < ApplicationController
  def create
    @favorite = Favorite.new(
      gist_id: params[:favorite][:gist_id], user_id: current_user.id
    )
    if @favorite.save
      render json: @favorite
    else
      render json: @favorite.errors, status: 422
    end
  end

  def destroy
    Favorite.where("gist_id = ? AND user_id = ?",
      params[:favorite][:gist_id], user_id: current_user.id)
      render json: { status: "successful deletion" }
  end
end
