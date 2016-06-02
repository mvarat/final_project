class Api::ArtworksController < ApplicationController

  include SessionsHelper

  # show all artworks in collection
  def index
    if params[:format] === "json"
      @user = current_user
      @collection = Collection.find params[:collection_id]
      @artworks = Artwork.where(collection_id: @collection.id)
      render json: @artworks
    else
      @user = current_user
      @collection = Collection.find params[:collection_id]
      @artworks = Artwork.where(collection_id: @collection.id)
      render :index
    end
  end

  def create
    new_artwork = Artwork.create artwork_params
    render json: {artworks: new_artwork }
  end


  def destroy
    @user = current_user
    artwork = Artwork.find params[:id]
    artwork.destroy
    redirect_to edit_collection_path artwork.collection_id
  end

  private

  def artwork_params
    params.require(:artwork).permit(:title, :url, :collection_id, :thumbnail)
  end

end
