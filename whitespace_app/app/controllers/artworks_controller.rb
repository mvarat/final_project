class ArtworksController < ApplicationController

  include SessionsHelper

  # show all artworks in collection
  def index
    @user = current_user
    @collection = Collection.find params[:collection_id]
    @artworks = Artwork.where(collection_id: @collection.id)
  end

  def create
    @user = current_user
    new_artwork = Artwork.create artwork_params.merge collection_id: params[:collection_id]
  end

  def new
    @user = current_user
    @collection = Collection.find params[:collection_id]
    @artwork = Artwork.new
  end

  def destroy
    @user = current_user
    artwork = Artwork.find params[:id]
    artwork.destroy
  end

  private

  def artwork_params
    params.require(:artwork).permit(:title, :artist, :date, :url)
  end

end
