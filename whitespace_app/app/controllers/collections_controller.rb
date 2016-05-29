class CollectionsController < ApplicationController

  include SessionsHelper

  # show all collections for the user
  def index
    @user = current_user
    @parties = Collection.where(user_id: @user)
  end

  # show all public collections
  def all
    @collections = Collection.where(is_public: true)
  end

  # create a new collection
  def new
    @user = current_user
    @collection = Collection.new
  end

  #create
  def create
    @user = current_user
    new_collection = Collection.create collection_params.merge user_id: current_user.id
  end

  def show
    @user = current_user
    @collection = Collection.find params[:id]
    @artworks = Artwork.where(collection_id: @collection.id)
  end

  #          PATCH  /travelers/:id(.:format)         travelers#update
  #          PUT    /travelers/:id(.:format)         travelers#update
  def update
    @user = current_user
    collection = Collection.find params[:id]
    collection.update collection_params
    redirect_to collection_path collection.id
  end

  def inactive
    @user = current_user
    collection = Collection.find params[:id]
    collection.update_attributes(active: false)
    redirect_to collections_path
  end

  private

    def collection_params
      params.require(:collection).permit(:name, :is_private, :user_id)
    end

end
